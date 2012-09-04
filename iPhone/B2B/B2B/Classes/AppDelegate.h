//
//  AppDelegate.h
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import <UIKit/UIKit.h>

#import <Cordova/CDVViewController.h>

@interface AppDelegate : NSObject <UIApplicationDelegate>
{
@private
}

@property (nonatomic, retain) IBOutlet UIWindow* window;
@property (nonatomic, retain) IBOutlet CDVViewController* viewController;

@end

