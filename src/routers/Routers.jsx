import React from 'react';
import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthWrapper from '../Auth/AuthWraper';
import Signin from '../Authpage/Signin'
import Signup from '../Authpage/Signup'
import RootLayout from '../RootLayout'
import AppLayout from '../components/AppLayout/AppLayout';
//Components
import Home from '../pages/home/Home';
import TripCreation from '../pages/trip_creation/TripCreation';
import TripView from '../components/trips/TripView';
import Profile from '../pages/profile/Profile';
import Settings from '../pages/settings/Settings';
import ExploreDetail from '../pages/Explore/ExploreDetail';
import Explore from '../pages/Explore/Explore';
import Chat from '../pages/Chats/Chat';
import Interactions from '../pages/Interactions/Interactions';

const router = createBrowserRouter([
    {
      path: "/",
      Component: AuthWrapper(AppLayout),
      children: [
          {
              index: true,
              Component: AuthWrapper(Home)
          },
          {
              path: 'trips',
              Component: AuthWrapper(Home),
          },
          {
              path: 'trips/create',
              Component: AuthWrapper(TripCreation),
          },
          {
              path: 'trip/:trip_id',
              Component: AuthWrapper(TripView),
          },
          {
              path: 'profile/:travel_mate_id',
              Component: AuthWrapper(Profile),
          },
          {
              path: 'settings',
              Component: AuthWrapper(Settings),
          },
          {
              path: 'explore',
              Component: AuthWrapper(Explore),
          },
          {
              path: 'explore/:category',
              Component: AuthWrapper(ExploreDetail),
          },
          {
              path: 'messages',
              Component: AuthWrapper(Chat),
          },
          {
              path: 'interactions',
              Component: AuthWrapper(Interactions),
          },
      ]
    },
    {
      path: "/",
      Component: RootLayout,
      children: [
          {
              path: 'login',
              Component: Signin,
          },
          {
            path:'register',
            Component : Signup
          },
          // {
          //   path:'forgot-password',
          //   Component : ForgotPassword
          // }
      ],
    },
])

  export default router