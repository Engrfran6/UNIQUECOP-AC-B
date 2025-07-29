'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Separator} from '@/components/ui/separator';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
import {useAuth} from '@/contexts/AuthContext';
import {useToast} from '@/hooks/use-toast';
import {db} from '@/lib/firebase';
import {updatePassword, updateProfile} from 'firebase/auth';
import {doc, updateDoc} from 'firebase/firestore';
import {Camera, Lock, Mail, MapPin, Phone, Save, User} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';

export default function AccountPage() {
  const {user, userData, loading} = useAuth();
  const {toast} = useToast();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const [profileData, setProfileData] = useState({
    displayName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/signin');
      return;
    }

    if (user) {
      setProfileData({
        displayName: user.displayName || '',
        email: user.email || '',
        phone: userData?.phone || '',
        address: userData?.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
      });
    }
  }, [user, userData, loading, router]);

  const handleProfileUpdate = async () => {
    if (!user) return;

    setIsSaving(true);

    try {
      // Update Firebase Auth profile
      await updateProfile(user, {
        displayName: profileData.displayName,
      });

      // Update Firestore document
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        displayName: profileData.displayName,
        phone: profileData.phone,
        address: profileData.address,
        updatedAt: new Date(),
      });

      toast({
        title: 'Profile updated',
        description: 'Your profile has been successfully updated.',
      });

      setIsEditing(false);
    } catch (error: any) {
      toast({
        title: 'Update failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user) return;

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: 'Password mismatch',
        description: 'New passwords do not match.',
        variant: 'destructive',
      });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast({
        title: 'Password too short',
        description: 'Password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      await updatePassword(user, passwordData.newPassword);

      toast({
        title: 'Password updated',
        description: 'Your password has been successfully changed.',
      });

      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    } catch (error: any) {
      toast({
        title: 'Password change failed',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-muted-gold"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-warm-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="font-playfair text-4xl font-bold text-charcoal-gray mb-2">My Account</h1>
            <p className="text-charcoal-gray/70">Manage your profile and preferences</p>
          </div>

          <Tabs defaultValue="profile" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-creamy-beige">
              <TabsTrigger
                value="profile"
                className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white">
                Profile
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white">
                Security
              </TabsTrigger>
              <TabsTrigger
                value="preferences"
                className="data-[state=active]:bg-sage-green data-[state=active]:text-warm-white">
                Preferences
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="font-playfair text-2xl text-charcoal-gray">
                    Profile Information
                  </CardTitle>
                  <Button
                    onClick={() => setIsEditing(!isEditing)}
                    variant="outline"
                    className="border-sage-green text-sage-green hover:bg-sage-green hover:text-warm-white">
                    {isEditing ? 'Cancel' : 'Edit Profile'}
                  </Button>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Profile Picture */}
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={user.photoURL || ''} alt={user.displayName || ''} />
                      <AvatarFallback className="bg-sage-green text-warm-white text-xl">
                        {getInitials(user.displayName || user.email || 'U')}
                      </AvatarFallback>
                    </Avatar>
                    {isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-soft-taupe/30 bg-transparent">
                        <Camera className="h-4 w-4 mr-2" />
                        Change Photo
                      </Button>
                    )}
                  </div>

                  <Separator className="bg-soft-taupe/30" />

                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/50" />
                        <Input
                          id="displayName"
                          value={profileData.displayName}
                          onChange={(e) =>
                            setProfileData({...profileData, displayName: e.target.value})
                          }
                          disabled={!isEditing}
                          className="pl-10 bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/50" />
                        <Input
                          id="email"
                          value={profileData.email}
                          disabled
                          className="pl-10 bg-soft-taupe/20 border-soft-taupe/30 opacity-60"
                        />
                      </div>
                      <p className="text-xs text-charcoal-gray/60">Email cannot be changed</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-charcoal-gray/50" />
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          disabled={!isEditing}
                          placeholder="(706) 342-2591"
                          className="pl-10 bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-soft-taupe/30" />

                  {/* Address Information */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5 text-charcoal-gray/70" />
                      <h3 className="font-semibold text-charcoal-gray">Address Information</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="street">Street Address</Label>
                        <Input
                          id="street"
                          value={profileData.address.street}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: {...profileData.address, street: e.target.value},
                            })
                          }
                          disabled={!isEditing}
                          placeholder="123 Main Street"
                          className="bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="city">City</Label>
                          <Input
                            id="city"
                            value={profileData.address.city}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {...profileData.address, city: e.target.value},
                              })
                            }
                            disabled={!isEditing}
                            placeholder="New York"
                            className="bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="state">State</Label>
                          <Input
                            id="state"
                            value={profileData.address.state}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {...profileData.address, state: e.target.value},
                              })
                            }
                            disabled={!isEditing}
                            placeholder="NY"
                            className="bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="zipCode">ZIP Code</Label>
                          <Input
                            id="zipCode"
                            value={profileData.address.zipCode}
                            onChange={(e) =>
                              setProfileData({
                                ...profileData,
                                address: {...profileData.address, zipCode: e.target.value},
                              })
                            }
                            disabled={!isEditing}
                            placeholder="10001"
                            className="bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Input
                          id="country"
                          value={profileData.address.country}
                          onChange={(e) =>
                            setProfileData({
                              ...profileData,
                              address: {...profileData.address, country: e.target.value},
                            })
                          }
                          disabled={!isEditing}
                          placeholder="Nigeria"
                          className="bg-creamy-beige border-soft-taupe/30 disabled:opacity-60"
                        />
                      </div>
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-4">
                      <Button
                        onClick={() => setIsEditing(false)}
                        variant="outline"
                        className="border-soft-taupe/30">
                        Cancel
                      </Button>
                      <Button
                        onClick={handleProfileUpdate}
                        disabled={isSaving}
                        className="btn-accent">
                        {isSaving ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-warm-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-charcoal-gray">
                    Security Settings
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Password Change */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Lock className="h-5 w-5 text-charcoal-gray/70" />
                      <h3 className="font-semibold text-charcoal-gray">Change Password</h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 max-w-md">
                      <div className="space-y-2">
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={(e) =>
                            setPasswordData({...passwordData, currentPassword: e.target.value})
                          }
                          className="bg-creamy-beige border-soft-taupe/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) =>
                            setPasswordData({...passwordData, newPassword: e.target.value})
                          }
                          className="bg-creamy-beige border-soft-taupe/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) =>
                            setPasswordData({...passwordData, confirmPassword: e.target.value})
                          }
                          className="bg-creamy-beige border-soft-taupe/30"
                        />
                      </div>

                      <Button
                        onClick={handlePasswordChange}
                        disabled={
                          isChangingPassword ||
                          !passwordData.currentPassword ||
                          !passwordData.newPassword
                        }
                        className="btn-accent w-fit">
                        {isChangingPassword ? 'Changing...' : 'Change Password'}
                      </Button>
                    </div>
                  </div>

                  <Separator className="bg-soft-taupe/30" />

                  {/* Account Information */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-charcoal-gray">Account Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-charcoal-gray/70">Account Created:</span>
                        <div className="font-medium text-charcoal-gray">
                          {user.metadata.creationTime
                            ? new Date(user.metadata.creationTime).toLocaleDateString()
                            : 'Unknown'}
                        </div>
                      </div>
                      <div>
                        <span className="text-charcoal-gray/70">Last Sign In:</span>
                        <div className="font-medium text-charcoal-gray">
                          {user.metadata.lastSignInTime
                            ? new Date(user.metadata.lastSignInTime).toLocaleDateString()
                            : 'Unknown'}
                        </div>
                      </div>
                      <div>
                        <span className="text-charcoal-gray/70">Email Verified:</span>
                        <div className="font-medium text-charcoal-gray">
                          {user.emailVerified ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div>
                        <span className="text-charcoal-gray/70">Sign-in Method:</span>
                        <div className="font-medium text-charcoal-gray">
                          {user.providerData[0]?.providerId === 'google.com'
                            ? 'Google'
                            : user.providerData[0]?.providerId === 'facebook.com'
                            ? 'Facebook'
                            : user.providerData[0]?.providerId === 'twitter.com'
                            ? 'Twitter'
                            : 'Email'}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Preferences Tab */}
            <TabsContent value="preferences">
              <Card className="bg-warm-white border-soft-taupe/20">
                <CardHeader>
                  <CardTitle className="font-playfair text-2xl text-charcoal-gray">
                    Preferences
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-charcoal-gray">Email Notifications</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-charcoal-gray">Order Updates</div>
                          <div className="text-sm text-charcoal-gray/70">
                            Receive notifications about your order status
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-charcoal-gray">Marketing Emails</div>
                          <div className="text-sm text-charcoal-gray/70">
                            Receive emails about new products and promotions
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-charcoal-gray">Newsletter</div>
                          <div className="text-sm text-charcoal-gray/70">
                            Weekly newsletter with mindful living tips
                          </div>
                        </div>
                        <input type="checkbox" defaultChecked className="rounded" />
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-soft-taupe/30" />

                  <div className="space-y-4">
                    <h3 className="font-semibold text-charcoal-gray">Shopping Preferences</h3>
                    <div className="space-y-3">
                      <div>
                        <Label htmlFor="currency">Preferred Currency</Label>
                        <select
                          id="currency"
                          className="mt-1 block w-full px-3 py-2 border border-soft-taupe/30 rounded-md bg-creamy-beige">
                          <option value="USD">USD ($)</option>
                          <option value="EUR">EUR (€)</option>
                          <option value="GBP">GBP (£)</option>
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="language">Language</Label>
                        <select
                          id="language"
                          className="mt-1 block w-full px-3 py-2 border border-soft-taupe/30 rounded-md bg-creamy-beige">
                          <option value="en">English</option>
                          <option value="es">Spanish</option>
                          <option value="fr">French</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <Button className="btn-accent">Save Preferences</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
