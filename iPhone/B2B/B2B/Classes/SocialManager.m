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

@synthesize facebook = _facebook;

+(SocialManager *) sharedSocialManager
{
	static SocialManager *socialManager = nil;
	
	if (socialManager == nil)
	{
		socialManager = [[SocialManager alloc] init];
	}
	
	return socialManager;
}

-(id) init
{
	self = [super init];
	
	if (self)
	{
		_facebook = nil;
	}
	
	return self;
}

-(void) dealloc
{
	self.facebook = nil;
	
	[super dealloc];
}

-(FBSession *) facebook
{
	if (_facebook == nil)
	{
        _facebook = [[FBSession alloc] init];
    }
	
	return _facebook;
}

-(void) createFacebookSession
{
	self.facebook = nil;
	
	if (self.facebook.state != FBSessionStateCreatedTokenLoaded)
	{
		[self.facebook openWithCompletionHandler:^(FBSession *session,
														 FBSessionState status,
														 NSError *error)
		{
			//Aggiorno lo stato al ripristino della sessione
		}];
	}
}

-(void) initLogin
{
	[self createFacebookSession];
}

@end
