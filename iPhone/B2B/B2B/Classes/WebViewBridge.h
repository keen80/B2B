//
//  WebViewBridge.h
//  B2B
//
//  Created by Massimiliano Casadei on 04/09/12.
//  Copyright (c) 2012 Imolinfo. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface WebViewBridge : NSObject
{
@private
    NSMutableDictionary *targetSelectors;
}

-(BOOL) decodeSelectorWithString:(NSString *)selectorString;

@end
