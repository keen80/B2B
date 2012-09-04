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

-(void) removeFacebookSession
{
	if (_facebook != nil)
	{
		[_facebook release];
		_facebook = nil;
	}
	
}

-(void) createFacebookSession
{
	[self removeFacebookSession];
	
	if (_facebook == nil)
	{
        _facebook = [[FBSession alloc] init];
    }
	
	if (_facebook.state == FBSessionStateCreatedTokenLoaded)
	{
		[_facebook openWithCompletionHandler:^(FBSession *session,
														 FBSessionState status,
														 NSError *error)
		{
			//Aggiorno lo stato al ripristino della sessione
		}];
	}
}

@end
