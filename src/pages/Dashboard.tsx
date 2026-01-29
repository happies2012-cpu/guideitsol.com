import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  LayoutDashboard, FileText, Navigation, Sparkles, Settings,
  Users, LogOut, Plus, Edit, Trash, Save
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { navigationAPI } from '@/lib/api';
import { pagesDB, aiToolsDB } from '@/lib/firebase-db';

const Dashboard = () => {
  const { user, logout, isAdmin, isSuperAdmin } = useAuth();
  const navigate = useNavigate();
  const [pages, setPages] = useState([]);
  const [aiTools, setAITools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [user, navigate]);

  const fetchData = async () => {
    try {
      if (isAdmin) {
        // Use Firebase DB helpers
        const [pagesData, toolsData] = await Promise.all([
          pagesDB.getAll(),
          aiToolsDB.getAll()
        ]);
        setPages(pagesData as any);
        setAITools(toolsData as any);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Failed to load data from Firebase');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Logged out successfully');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user.name}! ({user.role})
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Pages</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pages.length}</div>
                <p className="text-xs text-muted-foreground">Content pages</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">AI Tools</CardTitle>
                <Sparkles className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{aiTools.length}</div>
                <p className="text-xs text-muted-foreground">Listed tools</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="border-primary/20 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Your Role</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{user.role}</div>
                <p className="text-xs text-muted-foreground">Access level</p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Management Tabs */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-primary/20 backdrop-blur-lg bg-background/90 mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  System Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={async () => {
                    try {
                      const { seedData } = await import('@/lib/seed-data');
                      await seedData();
                      toast.success('Database seeded successfully!');
                      fetchData();
                    } catch (e) {
                      console.error(e);
                      toast.error('Seed failed');
                    }
                  }}
                  variant="outline"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Seed Database
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/20 backdrop-blur-lg bg-background/90">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <LayoutDashboard className="w-5 h-5" />
                  Content Management
                </CardTitle>
                <CardDescription>
                  Manage your pages, AI tools, and navigation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="pages" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="pages">Pages</TabsTrigger>
                    <TabsTrigger value="aitools">AI Tools</TabsTrigger>
                    <TabsTrigger value="navigation">Navigation</TabsTrigger>
                  </TabsList>

                  <TabsContent value="pages" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Manage Pages</h3>
                        <Button className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Page
                        </Button>
                      </div>
                      <div className="space-y-2">
                        {pages.slice(0, 5).map((page: any) => (
                          <div
                            key={page.id}
                            className="flex items-center justify-between p-4 border border-primary/20 rounded-lg hover:bg-primary/5"
                          >
                            <div>
                              <h4 className="font-medium">{page.title}</h4>
                              <p className="text-sm text-muted-foreground">{page.slug}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <Edit className="w-4 h-4" />
                              </Button>
                              {isSuperAdmin && (
                                <Button size="sm" variant="destructive">
                                  <Trash className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="aitools" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Manage AI Tools</h3>
                        <Button className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Tool
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {aiTools.slice(0, 6).map((tool: any) => (
                          <div
                            key={tool.id}
                            className="p-4 border border-primary/20 rounded-lg hover:bg-primary/5"
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium">{tool.name}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {tool.description}
                                </p>
                                <span className="text-xs text-primary mt-2 inline-block">
                                  {tool.category}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline">
                                  <Edit className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="navigation" className="mt-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-semibold">Manage Navigation</h3>
                        <Button className="flex items-center gap-2">
                          <Plus className="w-4 h-4" />
                          Add Menu Item
                        </Button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Navigation menu management coming soon. Use the JSON configuration file for now.
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* User Dashboard */}
        {!isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="border-primary/20 backdrop-blur-lg bg-background/90">
              <CardHeader>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
                <CardDescription>
                  Explore our platform and discover amazing features
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button onClick={() => navigate('/ai-learning')} className="w-full" size="lg">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Explore AI Learning Tools
                </Button>
                <Button onClick={() => navigate('/')} variant="outline" className="w-full" size="lg">
                  Go to Home
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
