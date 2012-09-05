//
//  SocialManager.m
//  B2B
//
//  Created by Massimiliano Casadei on 04/09/12.
//  Copyright (c) 2012 Imolinfo. All rights reserved.
//

#import "SocialManager.h"

@interface SocialManager (Private)

-(void) removeFacebookSession;
-(void) createFacebookSession;

@end

@implementation SocialManager

+(SocialManager *) sharedSocialManager
{
	static SocialManager *socialManager = nil;
	
	if (socialManager == nil)
	{
		socialManager = [[SocialManager alloc] init];
	}
	
	return socialManager;
}

-(void) dealloc
{
	[super dealloc];
}

-(void) createFacebookSession
{
	if (FBSession.activeSession.isOpen)
	{
        // login is integrated with the send button -- so if open, we send
        [self requestPersonalInfo];
    }
	else
	{
        [FBSession openActiveSessionWithPermissions:[NSArray arrayWithObjects:@"email", @"user_birthday", nil]
                                       allowLoginUI:YES
                                  completionHandler:^(FBSession *session,
                                                      FBSessionState status,
                                                      NSError *error)
		 {
			 if (error)
			 {
				 UIAlertView *alert = [[UIAlertView alloc] initWithTitle:@"Error"
																 message:error.localizedDescription
																delegate:nil
													   cancelButtonTitle:@"OK"
													   otherButtonTitles:nil];
				 [alert show];
			 }
			 else if (FB_ISSESSIONOPENWITHSTATE(status))
			 {
				 [self requestPersonalInfo];
			 }
		 }];
    }
}

-(void) requestPersonalInfo
{
	requestConnection = [[FBRequestConnection alloc] init];
	
	FBRequestHandler handler = ^(FBRequestConnection *connection, id result, NSError *error)
	{
		[self requestCompleted:connection forFbID:@"me" result:result error:error];
	};
	
	FBRequest *request = [[[FBRequest alloc] initWithSession:FBSession.activeSession
												  graphPath:@"me"] autorelease];
	
	[requestConnection addRequest:request completionHandler:handler];
	[requestConnection start];
}

-(void) requestCompleted:(FBRequestConnection *)connection
                 forFbID:fbID
                  result:(id)result
                   error:(NSError *)error
{
    if (requestConnection &&
        connection != requestConnection)
	{
        return;
    }
    
    // clean this up, for posterity
    [requestConnection release];
	requestConnection = nil;
	
	NSLog(@"%@", result);
	
	SEL selector = @selector(facebookLoginCompleted:personalInfo:);
	if ([self.delegate respondsToSelector:selector])
	{
		[self.delegate facebookLoginCompleted:YES personalInfo:result];
	}
}

-(void) initLogin
{
	[self createFacebookSession];
}

@end
