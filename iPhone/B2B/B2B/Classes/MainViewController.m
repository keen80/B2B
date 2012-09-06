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
	}
	
	return self;
}

-(void) dealloc
{
	[SocialManager sharedSocialManager].delegate = nil;
	[bridge release];
	
	[super dealloc];
}

-(void) viewDidLoad
{
	[super viewDidLoad];
	
	[SocialManager sharedSocialManager].delegate = self;
}

-(void) viewDidUnload
{
	[super viewDidUnload];
	
	[SocialManager sharedSocialManager].delegate = nil;
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
	NSString *suc = (success ? @"true" : @"false");
	NSString *email = @"";
	NSString *displayName = @"";
	NSString *nationality = @"";
	NSString *gender = @"";
	NSString *birthDay = @"";
	
	if (dict != nil)
	{
		email = [dict valueForKey:@"email"];
		email = ([email length] == 0 ? @"" : email);
		displayName = [dict valueForKey:@"name"];
		displayName = ([displayName length] == 0 ? @"" : displayName);
		nationality = [dict valueForKey:@"locale"];
		nationality = ([nationality length] == 0 ? @"" : nationality);
		gender = [dict valueForKey:@"gender"];
		gender = ([gender length] == 0 ? @"" : gender);
		birthDay = [dict valueForKey:@"birthday"];
		birthDay = ([birthDay length] == 0 ? @"" : birthDay);
	}
	//success, email, displayName, gender, nationality, birthDay
	NSString *string = [NSString stringWithFormat:@"loginOnFBCompleted(%@, \"%@\",\"%@\",\"%@\",\"%@\",\"%@\");", suc, email, displayName, gender, nationality, birthDay];
	[self executeJavascriptString:string];
}

-(void) facebookUserLoginStatus:(BOOL)isLogged
{
	NSString *string = [NSString stringWithFormat:@"facebookLogInStatus(%@);", (isLogged ? @"true" : @"false")];
	[self executeJavascriptString:string];
}

-(void) logoutCompleted
{
	NSString *string = @"logoutCompleted();";
	[self executeJavascriptString:string];
}

@end
