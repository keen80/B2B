//
//  SocialManager.h
//  B2B
//
//  Created by Massimiliano Casadei on 04/09/12.
//  Copyright (c) 2012 Imolinfo. All rights reserved.
//

#import <Foundation/Foundation.h>

#import <FacebookSDK/FacebookSDK.h>

@protocol SocialManagerDelegate <NSObject>

-(void) facebookLoginCompleted:(BOOL)success personalInfo:(NSDictionary *)dict;
-(void) facebookUserLoginStatus:(BOOL)isLogged;
-(void) logoutCompleted;

@end

@interface SocialManager : NSObject
{
@private
	FBRequestConnection *requestConnection;
	id <SocialManagerDelegate> delegate;
}

@property (nonatomic, assign) id <SocialManagerDelegate> delegate;

+(SocialManager *) sharedSocialManager;

-(void) createFacebookSession;

-(void) doLoginOnFB;

@end
