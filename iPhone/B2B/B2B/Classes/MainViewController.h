//
//  MainViewController.h
//  B2B
//
//  Created by Stefano Maggiore on 17/08/12.
//  Copyright Imolinfo 2012. All rights reserved.
//

#import <Cordova/CDVViewController.h>

#import "SocialManager.h"

@interface MainViewController : CDVViewController <UIApplicationDelegate>
{
@private
	SocialManager *socialManager;
}

@end
