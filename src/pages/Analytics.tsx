import { DashboardLayout } from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, Users, DollarSign, Target, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const Analytics = () => {
  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000, deals: 12 },
    { month: 'Fév', revenue: 52000, deals: 15 },
    { month: 'Mar', revenue: 48000, deals: 13 },
    { month: 'Avr', revenue: 61000, deals: 18 },
    { month: 'Mai', revenue: 55000, deals: 16 },
    { month: 'Juin', revenue: 67000, deals: 20 },
  ];

  const dealsByStage = [
    { name: 'Prospect', value: 35, color: '#8B5CF6' },
    { name: 'Qualification', value: 25, color: '#F59E0B' },
    { name: 'Proposition', value: 20, color: '#3B82F6' },
    { name: 'Négociation', value: 15, color: '#10B981' },
    { name: 'Gagné', value: 5, color: '#22C55E' },
  ];

  const topClients = [
    { name: 'TechCorp', value: 125000 },
    { name: 'StartupXYZ', value: 98000 },
    { name: 'MegaSoft', value: 87000 },
    { name: 'InnovCorp', value: 72000 },
    { name: 'FinanceApp', value: 65000 },
  ];

  const conversionData = [
    { stage: 'Prospect', rate: 80 },
    { stage: 'Qualification', rate: 65 },
    { stage: 'Proposition', rate: 50 },
    { stage: 'Négociation', rate: 75 },
    { stage: 'Clôture', rate: 60 },
  ];

  const exportToPDF = () => {
    console.log('Export PDF functionality to be implemented');
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Rapports</h1>
            <p className="text-muted-foreground mt-2">
              Visualisez vos performances et tendances
            </p>
          </div>
          <Button onClick={exportToPDF} className="gap-2">
            <Download className="h-4 w-4" />
            Exporter PDF
          </Button>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-4 gap-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Revenu Total</p>
                <p className="text-2xl font-bold text-foreground">328K€</p>
                <p className="text-xs text-success mt-1">+12.5% vs mois dernier</p>
              </div>
              <DollarSign className="h-8 w-8 text-success" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Opportunités</p>
                <p className="text-2xl font-bold text-foreground">94</p>
                <p className="text-xs text-info mt-1">+8 ce mois</p>
              </div>
              <Target className="h-8 w-8 text-info" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Clients</p>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-xs text-primary mt-1">+15 nouveaux</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Taux de conversion</p>
                <p className="text-2xl font-bold text-foreground">64%</p>
                <p className="text-xs text-warning mt-1">-2.3% vs mois dernier</p>
              </div>
              <TrendingUp className="h-8 w-8 text-warning" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="w-full">
          <TabsList>
            <TabsTrigger value="revenue">Revenus</TabsTrigger>
            <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="conversion">Conversion</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Évolution du Revenu</h3>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="hsl(var(--primary))" strokeWidth={2} name="Revenu (€)" />
                  <Line type="monotone" dataKey="deals" stroke="hsl(var(--success))" strokeWidth={2} name="Deals" />
                </LineChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="pipeline">
            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Distribution par Étape</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <PieChart>
                    <Pie
                      data={dealsByStage}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dealsByStage.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">Taux de Conversion par Étape</h3>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={conversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stage" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="rate" fill="hsl(var(--primary))" name="Taux (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Top 5 Clients par Revenu</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={topClients} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(var(--success))" name="Revenu (€)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>

          <TabsContent value="conversion">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Funnel de Conversion</h3>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={conversionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="stage" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rate" fill="hsl(var(--info))" name="Taux de conversion (%)" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;