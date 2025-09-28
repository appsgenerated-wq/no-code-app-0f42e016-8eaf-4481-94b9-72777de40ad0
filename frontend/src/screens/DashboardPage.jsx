import React, { useEffect, useState, useCallback } from 'react';
import Manifest from '@mnfst/sdk';
import { PlusIcon, HeartIcon, BookOpenIcon, UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const DashboardPage = ({ user, onLogout }) => {
  const [recipes, setRecipes] = useState([]);
  const [myRecipes, setMyRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');

  const manifest = new Manifest();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [recipesResponse, userProfileResponse] = await Promise.all([
        manifest.from('Recipe').find({ include: ['author', 'categories'], sort: { createdAt: 'desc' } }),
        manifest.from('User').findById(user.id, { include: ['favoriteRecipes.author', 'favoriteRecipes.categories'] })
      ]);

      setRecipes(recipesResponse.data);

      const userCreatedRecipes = recipesResponse.data.filter(r => r.author?.id === user.id);
      setMyRecipes(userCreatedRecipes);

      if (userProfileResponse?.favoriteRecipes) {
        setFavoriteRecipes(userProfileResponse.favoriteRecipes);
      }

    } catch (error) {
      console.error('Failed to load data:', error);
      alert('Could not load recipes. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderRecipeGrid = (recipeList) => {
    if (loading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (!recipeList || recipeList.length === 0) {
      return <p className="text-center text-gray-500 mt-8">No recipes found here. Why not add one?</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipeList.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
            <div className="relative">
              <img src={recipe.mainImage.thumbnail} alt={recipe.title} className="w-full h-48 object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-10 transition-all"></div>
            </div>
            <div className="p-6">
              <p className="text-sm text-orange-600 font-semibold">{recipe.categories?.[0]?.name || 'Uncategorized'}</p>
              <h3 className="text-xl font-bold text-gray-900 mt-2 truncate">{recipe.title}</h3>
              <p className="text-gray-600 mt-2">By {recipe.author?.name || 'Unknown Author'}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  const tabs = [
    { id: 'all', name: 'All Recipes', icon: BookOpenIcon },
    { id: 'my', name: 'My Recipes', icon: UserIcon },
    { id: 'favorites', name: 'Favorites', icon: HeartIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-600">FlavorVerse</h1>
          <div className="flex items-center space-x-4">
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-orange-700 transition-colors flex items-center space-x-2">
              <PlusIcon className="h-5 w-5" />
              <span>Add Recipe</span>
            </button>
            <div className="flex items-center space-x-2">
              <img src={user.avatar?.thumbnail || `https://ui-avatars.com/api/?name=${user.name}&background=random`} alt={user.name} className="h-10 w-10 rounded-full object-cover" />
              <span className="font-medium hidden sm:block">{user.name}</span>
            </div>
            <button onClick={onLogout} className="p-2 text-gray-500 hover:text-red-600">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="sm:hidden">
            <select
              id="tabs"
              name="tabs"
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              defaultValue={tabs.find(tab => tab.id === activeTab).name}
              onChange={(e) => setActiveTab(tabs.find(tab => tab.name === e.target.value).id)}
            >
              {tabs.map((tab) => <option key={tab.name}>{tab.name}</option>)}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    onClick={() => setActiveTab(tab.id)}
                    className={`${
                      activeTab === tab.id
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm`}
                  >
                    <tab.icon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        <div>
          {activeTab === 'all' && renderRecipeGrid(recipes)}
          {activeTab === 'my' && renderRecipeGrid(myRecipes)}
          {activeTab === 'favorites' && renderRecipeGrid(favoriteRecipes)}
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
