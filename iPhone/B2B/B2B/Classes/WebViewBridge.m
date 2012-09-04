//
//  WebViewBridge.m
//  B2B
//
//  Created by Massimiliano Casadei on 04/09/12.
//  Copyright (c) 2012 Imolinfo. All rights reserved.
//

#import "WebViewBridge.h"

#import "SocialManager.h"

@interface WebViewBridge (Private)

-(NSRange) searchSelector:(NSString *)stringURL;

-(NSArray *) targetSelectorsFromComponent:(NSString *)component;

-(id) objectWithType:(NSString *)type andValue:(NSString *)value;
-(id) objectFromTypeAndValueComponent:(NSString *)component;

-(NSDictionary *) dictionaryWithTargetsAndSelectorFromInvocation:(NSString *)invocation;

-(void) executeSelector:(NSString *)selector withParameters:(NSArray *)parameters forTargets:(NSArray *)targets;

@end

@implementation WebViewBridge

-(void) dealloc
{
    [targetSelectors removeAllObjects];
    [targetSelectors release];
    targetSelectors = nil;
    
    [super dealloc];
}

// Each time something happen through the WebGUI we are faking an open URL passing a selector string to decode
//
// es. selector://targets=hyperion:setExamGroup:'int'_'10':'float_'1.2':'string'_'pippo'|targets=rootView:setExamGroup:'string'_'pluto'"
//
-(BOOL) decodeSelectorWithString:(NSString *)stringURL
{
    if (targetSelectors == nil)
    {
        targetSelectors = [[NSMutableDictionary alloc] initWithCapacity:1];
        
		[targetSelectors setObject:[SocialManager sharedSocialManager]
							forKey:@"socialManager"];
    }
    
    stringURL = [stringURL stringByReplacingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    NSLog(@"[WebViewBridge] %@", stringURL);
    
    NSRange range = [self searchSelector:stringURL];
    
    if (range.location != NSNotFound)
    {
        NSString *invocationsString = [stringURL substringFromIndex:range.length];
        NSArray *invocations = [invocationsString componentsSeparatedByString:@"|"];
        
        for (NSString *invocation in invocations)
        {
            if (![invocation isEqualToString:@""])
            {
                NSDictionary *dictionay = [self dictionaryWithTargetsAndSelectorFromInvocation:invocation];
                
                if (dictionay)
                {
                    NSString *selector = [dictionay objectForKey:@"selector"];
                    NSArray *parameters = [dictionay objectForKey:@"parameters"];
                    NSArray *targets = [dictionay objectForKey:@"targets"];
                    
                    NSLog(@"[WebViewBridge] Targets: %@\nSelector: %@\nParameters: %@", targets, selector, parameters);
                    
                    [self executeSelector:selector withParameters:parameters forTargets:targets];
                }
            }
        }
		
        return NO;
    }
    
    return YES;
}

-(NSRange) searchSelector:(NSString *)stringURL
{
    NSRange range = [stringURL rangeOfString:@"selector://"];
    
    if (range.location == NSNotFound)
    {
        NSLog(@"[WebViewBridge] Selettore non presente.");
    }
    
    return range;
}

// Get list of targets selectors from component with format: target=hyperion,header

-(NSArray *) targetSelectorsFromComponent:(NSString *)component
{
    if (!component || [component isEqualToString:@""])
    {
        return nil;
    }
    
    NSArray *components = [component componentsSeparatedByString:@"="];
    
    if ([components count] != 2)
    {
        return nil;
    }
    
    NSString *targetsString = [components objectAtIndex:1];
    NSArray *targets = [targetsString componentsSeparatedByString:@","];
    NSMutableArray *selectors = [NSMutableArray array];
    
    for (NSString *target in targets)
    {
        id selector = [targetSelectors objectForKey:target];
        
        if (selector)
        {
            [selectors addObject:selector];
        }
    }
    
    return selectors;
}

// Get type from type string and return an object with value of value

-(id) objectWithType:(NSString *)type andValue:(NSString *)value
{
    id object = nil;
    
    if ([type isEqualToString:@"string"])
    {
        object = value;
    }
    else if ([type isEqualToString:@"float"])
    {
        float temp = [value floatValue];
        object = [NSNumber numberWithFloat:temp];
    }
    else if ([type isEqualToString:@"int"])
    {
        float temp = [value intValue];
        object = [NSNumber numberWithInt:temp];
    }
    else if ([type isEqualToString:@"boolean"])
    {
        BOOL temp = [value isEqualToString:@"true"];
        object = [NSNumber numberWithBool:temp];
    }
    
    return object;
}

// From string with format (example 'float'_'10') return an object

-(id) objectFromTypeAndValueComponent:(NSString *)component
{
    NSArray *components = [component componentsSeparatedByString:@"'_'"];
    
    if ([components count] == 2)
    {
        NSString *type = [components objectAtIndex:0];
        type = [type substringFromIndex:1];
        
        NSString *value = [components objectAtIndex:1];
        value = [value substringToIndex:(value.length - 1)];
        
        return [self objectWithType:type andValue:value];
    }
    
    return nil;
}

-(NSDictionary *) dictionaryWithTargetsAndSelectorFromInvocation:(NSString *)invocation
{
    NSArray *elements = [invocation componentsSeparatedByString:@":"];
    
    if (!elements || [elements count] == 0)
    {
        return nil;
    }
    
    NSMutableArray *components = [NSMutableArray arrayWithArray:elements];
    NSString *targetsString = [components objectAtIndex:0];
    NSArray *targets = [self targetSelectorsFromComponent:targetsString];
    NSString *sel = [components objectAtIndex:1];
    NSMutableString *selector = [NSMutableString stringWithString:sel];
    NSMutableArray *parameters = nil;
    
    [components removeObject:targetsString];
    [components removeObject:sel];
    
    if ([components count] > 0)
    {
        [selector appendString:@":"];
        
        parameters = [NSMutableArray array];
        
        for (NSString *component in components)
        {
            id parameter = [self objectFromTypeAndValueComponent:component];
            
            if (parameter)
            {
                [parameters addObject:parameter];
            }
        }
        
        if ([parameters count] == 0)
        {
            parameters = nil;
        }
    }
    
    NSMutableDictionary *dict = [NSMutableDictionary dictionary];
    
    if (targets)
    {
        [dict setObject:targets forKey:@"targets"];
    }
    
    if (selector)
    {
        [dict setObject:selector forKey:@"selector"];
    }
    
    if (parameters)
    {
        [dict setObject:parameters forKey:@"parameters"];
    }
    
    return dict;
}

#pragma mark - Execute selector

-(void) executeSelector:(NSString *)selector withParameters:(NSArray *)parameters forTargets:(NSArray *)targets
{
    for (id target in targets)
    {
        SEL sel = NSSelectorFromString(selector);
        
        if ([target respondsToSelector:sel])
        {
            [target performSelector:sel withObject:parameters afterDelay:0.0f];
        }
    }
}

@end
