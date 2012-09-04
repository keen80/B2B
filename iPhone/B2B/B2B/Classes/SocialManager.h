//
//  SocialManager.h
//  B2B
//
//  Created by Massimiliano Casadei on 04/09/12.
//  Copyright (c) 2012 Imolinfo. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <FacebookSDK/FacebookSDK.h>

@interface SocialManager : NSObject
{
@private
	FBSession *_facebook;
}

@property (nonatomic, retain) FBSession *facebook;

-(void) createFacebookSession;

@end
