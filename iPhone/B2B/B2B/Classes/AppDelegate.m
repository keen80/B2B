//
//  AppDelegate.m
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import "AppDelegate.h"
#import "MainViewController.h"

#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVURLProtocol.h>
#import <FacebookSDK/FacebookSDK.h>

#import "SocialManager.h"

@implementation AppDelegate

@synthesize window, viewController;

-(id) init
{
	self = [super init];
	
	if (self)
	{
		/** If you need to do any extra app-specific initialization, you can do it here
		 *  -jm
		 **/
		NSHTTPCookieStorage *cookieStorage = [NSHTTPCookieStorage sharedHTTPCookieStorage];
		[cookieStorage setCookieAcceptPolicy:NSHTTPCookieAcceptPolicyAlways];
        
		[CDVURLProtocol registerURLProtocol];
	}
    
    return self;
}

-(void) dealloc
{
	socialManager = nil;
	self.viewController = nil;
	
	[super dealloc];
}

#pragma - UIApplicationDelegate implementation

/**
 * This is main kick off after the app inits, the views and Settings are setup here. (preferred - iOS4 and up)
 */
-(BOOL) application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
	socialManager = [SocialManager sharedSocialManager];
	
    CGRect screenBounds = [[UIScreen mainScreen] bounds];
    self.window = [[[UIWindow alloc] initWithFrame:screenBounds] autorelease];
    self.window.autoresizesSubviews = YES;
    
    CGRect viewBounds = [[UIScreen mainScreen] applicationFrame];
    
    self.viewController = [[MainViewController alloc] initWithNibName:@"MainViewController" bundle:nil];
    self.viewController.useSplashScreen = YES;
    self.viewController.wwwFolderName = @"www";
    self.viewController.startPage = @"index.html";
    self.viewController.view.frame = viewBounds;
    
    // check whether the current orientation is supported: if it is, keep it, rather than forcing a rotation
    BOOL forceStartupRotation = YES;
    UIDeviceOrientation curDevOrientation = [[UIDevice currentDevice] orientation];
    
    if (UIDeviceOrientationUnknown == curDevOrientation)
	{
        // UIDevice isn't firing orientation notifications yet… go look at the status bar
        curDevOrientation = (UIDeviceOrientation)[[UIApplication sharedApplication] statusBarOrientation];
    }
    
    if (UIDeviceOrientationIsValidInterfaceOrientation(curDevOrientation))
	{
        for (NSNumber *orient in self.viewController.supportedOrientations)
		{
            if ([orient intValue] == curDevOrientation) {
                forceStartupRotation = NO;
                break;
            }
        }
    } 
    
    if (forceStartupRotation)
	{
        NSLog(@"supportedOrientations: %@", self.viewController.supportedOrientations);
        // The first item in the supportedOrientations array is the start orientation (guaranteed to be at least Portrait)
        UIInterfaceOrientation newOrient = [[self.viewController.supportedOrientations objectAtIndex:0] intValue];
        NSLog(@"AppDelegate forcing status bar to: %d from: %d", newOrient, curDevOrientation);
        [[UIApplication sharedApplication] setStatusBarOrientation:newOrient];
    }
    
    [self.window addSubview:self.viewController.view];
    [self.window makeKeyAndVisible];
    
    return YES;
}

-(BOOL) application:(UIApplication*)application handleOpenURL:(NSURL*)url
{
    if (!url)
	{
        return NO; 
    }
    
	// calls into javascript global function 'handleOpenURL'
    NSString* jsString = [NSString stringWithFormat:@"handleOpenURL(\"%@\");", url];
    [self.viewController.webView stringByEvaluatingJavaScriptFromString:jsString];
    
    // all plugins will get the notification, and their handlers will be called 
    [[NSNotificationCenter defaultCenter] postNotification:[NSNotification notificationWithName:CDVPluginHandleOpenURLNotification object:url]];
    
    return YES;    
}

-(BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    return [FBSession.activeSession handleOpenURL:url];
}

-(void) applicationWillTerminate:(UIApplication *)application
{
    [FBSession.activeSession close];
}

-(void) applicationDidBecomeActive:(UIApplication *)application
{
	[socialManager applicationBecomeActive];
	[self.viewController applicationBecomeActive];
	
	if (FBSession.activeSession.state == FBSessionStateCreatedOpening)
	{
        // BUG: for the iOS 6 preview we comment this line out to compensate for a race-condition in our
        // state transition handling for integrated Facebook Login; production code should close a
        // session in the opening state on transition back to the application; this line will again be
        // active in the next production rev
        //[self.session close]; // so we close our session and start over
    }
}

@end
