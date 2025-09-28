import React from 'react';
import config from '../constants.js';
import { BookOpenIcon, UserGroupIcon, SparklesIcon } from '@heroicons/react/24/outline';

const LandingPage = ({ onLogin }) => {
  const features = [
    { name: 'Discover Recipes', description: 'Explore thousands of recipes from a global community of chefs.', icon: BookOpenIcon },
    { name: 'Share Your Creations', description: 'Easily upload and share your favorite recipes with the world.', icon: SparklesIcon },
    { name: 'Community Focused', description: 'Join a vibrant community, review recipes, and save your favorites.', icon: UserGroupIcon },
  ];

  return (
    <div className="min-h-screen bg-white">
      <main>
        <div className="relative">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="relative shadow-xl sm:rounded-2xl sm:overflow-hidden">
              <div className="absolute inset-0">
                <img
                  className="h-full w-full object-cover"
                  src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="People eating delicious food"
                />
                <div className="absolute inset-0 bg-orange-600 mix-blend-multiply" />
              </div>
              <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                <h1 className="text-center text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                  <span className="block text-white">Welcome to FlavorVerse</span>
                  <span className="block text-orange-200">Your Culinary Companion</span>
                </h1>
                <p className="mt-6 max-w-lg mx-auto text-center text-xl text-orange-100 sm:max-w-3xl">
                  Discover, create, and share amazing recipes from around the world. Join our community of food lovers today.
                </p>
                <div className="mt-10 max-w-sm mx-auto sm:max-w-none sm:flex sm:justify-center">
                  <div className="space-y-4 sm:space-y-0 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5">
                    <button
                      onClick={() => onLogin('demo@example.com', 'password')}
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-orange-700 bg-white hover:bg-orange-50 sm:px-8"
                    >
                      Try Demo
                    </button>
                    <a
                      href={config.BACKEND_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center px-4 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-500 bg-opacity-80 hover:bg-opacity-100 sm:px-8"
                    >
                      Admin Panel
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-100 pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">What We Offer</h2>
              <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
                Everything you need to explore the world of cooking.
              </p>
            </div>
            <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
              {features.map((feature) => (
                <div key={feature.name} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
                  <div className="flex-shrink-0 bg-white p-6 flex items-center">
                    <feature.icon className="h-10 w-10 text-orange-600" aria-hidden="true" />
                  </div>
                  <div className="flex-1 bg-white p-6 pt-0 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-900">{feature.name}</p>
                      <p className="mt-3 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
