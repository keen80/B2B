//
//  AppDelegate.h
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <Cordova/CDVViewController.h>

@class MainViewController;
@class SocialManager;

@interface AppDelegate : NSObject <UIApplicationDelegate>
{
@private
	SocialManager *socialManager;
}

@property (nonatomic, retain) IBOutlet UIWindow* window;
@property (nonatomic, retain) IBOutlet MainViewController* viewController;

@end

