//
//  SocialManager.m
//  B2B
//
//  Created by Massimiliano Casadei on 04/09/12.
//  Copyright (c) 2012 Imolinfo. All rights reserved.
//

#import "SocialManager.h"

@interface SocialManager (Private)

-(void) removeCurrentRequest;
-(void) removeFacebookSession;
-(void) createFacebookSession;

-(void) requestPersonalInfo;
-(void) requestPersonalInfoCompleted:(FBRequestConnection *)connection
							 forFbID:fbID
							  result:(id)result
							   error:(NSError *)error;
-(void) requestFacebookApplicationFriendsCompleted:(FBRequestConnection *)connection
										   forFbID:fbID
											result:(id)result
											 error:(NSError *)error;

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
	self.delegate = nil;
	[self removeCurrentRequest];
	
	[facebookFriends removeAllObjects];
	[facebookFriends release];
	facebookFriends = nil;
	
	[super dealloc];
}

-(void) removeCurrentRequest
{
	[requestConnection cancel];
	[requestConnection release];
	requestConnection = nil;
}

-(void) createFacebookSession
{
	if (FBSession.activeSession.isOpen)
	{
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
			 BOOL err = NO;
			 switch (status)
			 {
				 case FBSessionStateClosed:
					 [FBSession.activeSession closeAndClearTokenInformation];
				 case FBSessionStateOpen:
					 err = (error != nil);
					 break;
				 case FBSessionStateClosedLoginFailed:
					 [FBSession.activeSession closeAndClearTokenInformation];
					 err = YES;
					 break;
				 default:
					 break;
			 }
			 
			 if (err)
			 {
				 NSLog(@"[FBSession] Error: %@", error.localizedDescription);
				 
				 SEL selector = @selector(facebookLoginCompleted:personalInfo:);
				 if ([self.delegate respondsToSelector:selector])
				 {
					 [self.delegate facebookLoginCompleted:NO personalInfo:nil];
				 }
			 }
			 else
			 {
				 [self requestPersonalInfo];
			 }
		 }];
    }
}

#pragma mark - Public methods

-(void) applicationBecomeActive
{
	if (!FBSession.activeSession.isOpen && (FBSession.activeSession.state != FBSessionStateCreatedTokenLoaded))
	{
		[FBSession.activeSession close];
		[self removeCurrentRequest];
	}
}

#pragma mark - Private requests

-(void) requestPersonalInfo
{
	[self removeCurrentRequest];
	requestConnection = [[FBRequestConnection alloc] init];
	
	FBRequestHandler handler = ^(FBRequestConnection *connection, id result, NSError *error)
	{
		[self requestPersonalInfoCompleted:connection forFbID:@"me" result:result error:error];
	};
	
	FBRequest *request = [[[FBRequest alloc] initWithSession:FBSession.activeSession
												   graphPath:@"me"] autorelease];
	
	[requestConnection addRequest:request completionHandler:handler];
	[requestConnection start];
}

#pragma mark - Facebook public requests

-(void) getFBUserLogInStatus
{
	SEL selector = @selector(facebookUserLoginStatus:);
	if ([self.delegate respondsToSelector:selector])
	{
		[self.delegate facebookUserLoginStatus:(FBSession.activeSession.state == FBSessionStateCreatedTokenLoaded)];
	}
}

-(void) getFBUserInformations
{
	[self requestPersonalInfo];
}

-(void) doLoginOnFB
{
	[self createFacebookSession];
}

-(void) logout
{
	[self removeCurrentRequest];
	[FBSession.activeSession closeAndClearTokenInformation];
	
	SEL selector = @selector(facebookLogoutCompleted);
	if ([self.delegate respondsToSelector:selector])
	{
		[self.delegate facebookLogoutCompleted];
	}
}

-(void) requestFacebookFriends
{
	[self removeCurrentRequest];
	requestConnection = [[FBRequestConnection alloc] init];
	
	FBRequestHandler handler = ^(FBRequestConnection *connection, id result, NSError *error)
	{
		[self requestFacebookFriendsCompleted:connection forFbID:@"me/friends" result:result error:error];
	};
	
	FBRequest *request = [[[FBRequest alloc] initWithSession:FBSession.activeSession
												   graphPath:@"me/friends"] autorelease];
	
	[requestConnection addRequest:request completionHandler:handler];
	[requestConnection start];
}

-(void) requestFacebookApplicationFriends
{
	[self removeCurrentRequest];
	requestConnection = [[FBRequestConnection alloc] init];
	
	FBRequestHandler handler = ^(FBRequestConnection *connection, id result, NSError *error)
	{
		[self requestFacebookApplicationFriendsCompleted:connection forFbID:@"me" result:result error:error];
	};
	
	FBRequest *request = [[[FBRequest alloc] initWithSession:FBSession.activeSession
												  restMethod:@"friends.getAppUsers"
												  parameters:[NSDictionary dictionary]
												  HTTPMethod:@"GET"] autorelease];
	
	[requestConnection addRequest:request completionHandler:handler];
	[requestConnection start];
}

-(void) getFacebookFriends
{
	[self requestFacebookFriends];
}

#pragma mark - Facebook callbacks

-(void) requestPersonalInfoCompleted:(FBRequestConnection *)connection
							 forFbID:fbID
							  result:(id)result
							   error:(NSError *)error
{
    if (requestConnection &&
        connection != requestConnection)
	{
        return;
    }
	
    [self removeCurrentRequest];
	
	NSLog(@"%@", result);
	
	SEL selector = @selector(facebookLoginCompleted:personalInfo:);
	if ([self.delegate respondsToSelector:selector])
	{
		[self.delegate facebookLoginCompleted:(error == nil) personalInfo:result];
	}
}

-(void) requestFacebookFriendsCompleted:(FBRequestConnection *)connection
								forFbID:fbID
								 result:(id)result
								  error:(NSError *)error
{
    if (requestConnection &&
        connection != requestConnection)
	{
        return;
    }
    [self removeCurrentRequest];
	NSLog(@"[SocialManager] Request friends completed!");
	
	if (facebookFriends == nil)
	{
		facebookFriends = [[NSMutableArray alloc] init];
	}
	
	[facebookFriends removeAllObjects];
	
	[self requestFacebookApplicationFriends];
}

-(void) requestFacebookApplicationFriendsCompleted:(FBRequestConnection *)connection
										   forFbID:fbID
											result:(id)result
											 error:(NSError *)error
{
    if (requestConnection &&
        connection != requestConnection)
	{
        return;
    }
    [self removeCurrentRequest];
	NSLog(@"[SocialManager] Request application's friends completed!");
	
	SEL selector = @selector(facebookFriendsCompleted:);
	if ([self.delegate respondsToSelector:selector])
	{
		[self.delegate facebookFriendsCompleted:result];
	}
}

@end
