//
//  MainViewController.h
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import "MainViewController.h"

#import "WebViewBridge.h"

@implementation MainViewController

-(id) initWithNibName:(NSString *)nibNameOrNil bundle:(NSBundle *)nibBundleOrNil
{
	self = [super initWithNibName:nibNameOrNil bundle:nibBundleOrNil];
	
	if (self)
	{
		bridge = [[WebViewBridge alloc] init];
		[SocialManager sharedSocialManager].delegate = self;
	}
	
	return self;
}

-(void) dealloc
{
	[SocialManager sharedSocialManager].delegate = nil;
	[bridge release];
	
	[super dealloc];
}

-(void) executeJavascriptString:(NSString *)function
{
    if (function && ![function isEqualToString:@""])
    {
        [self.webView stringByEvaluatingJavaScriptFromString:function];
    }
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
	NSString *stringURL = [[request URL] absoluteString];
    return ([bridge decodeSelectorWithString:stringURL] && [super webView:theWebView shouldStartLoadWithRequest:request navigationType:navigationType]);
}

#pragma mark - SocialManager delegate methods

-(void) facebookLoginCompleted:(BOOL)success personalInfo:(NSDictionary *)dict
{
	NSString *email = [dict valueForKey:@"email"];
	NSString *displayName = [dict valueForKey:@"name"];
	NSString *nationality = [dict valueForKey:@"locale"];
	NSString *gender = [dict valueForKey:@"gender"];
	NSString *birthDay = [dict valueForKey:@"birthday"];
	//email, displayName, gender, nationality, birthDay
	NSString *string = [NSString stringWithFormat:@"loginOnFBCompleted(\"%@\",\"%@\",\"%@\",\"%@\",\"%@\");", email, displayName, gender, nationality, birthDay];
	[self executeJavascriptString:string];
}

@end
