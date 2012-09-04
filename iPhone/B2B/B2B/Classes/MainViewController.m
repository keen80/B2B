//
//  MainViewController.h
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import "MainViewController.h"

@implementation MainViewController

-(id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
	self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
	
	if (self)
	{
		socialManager = nil;
	}
	
	return self;
}

#pragma mark - View lifecycle

-(void) viewDidLoad
{
	[super viewDidLoad];
	
	if (socialManager == nil)
	{
		socialManager = [[SocialManager alloc] init];
	}
	
	[socialManager createFacebookSession];
}

#pragma mark - UIApplication delegate methods

-(BOOL) application:(UIApplication *)application openURL:(NSURL *)url sourceApplication:(NSString *)sourceApplication annotation:(id)annotation
{
    return [socialManager.facebook handleOpenURL:url];
}

#pragma UIWebDelegate implementation

-(void) webViewDidFinishLoad:(UIWebView*) theWebView
{
     // Black base color for background matches the native apps
     theWebView.backgroundColor = [UIColor blackColor];

	return [super webViewDidFinishLoad:theWebView];
}

-(BOOL) webView:(UIWebView*)theWebView shouldStartLoadWithRequest:(NSURLRequest*)request navigationType:(UIWebViewNavigationType)navigationType
{
//	NSLog(@"%@", [request.URL absoluteString]);
	return [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType];
}


@end
