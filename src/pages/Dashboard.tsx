import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Cloud, Users, Server, Database, Brain, Workflow, Box, Activity } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "@/store/useUserStore";
import { MultiTenantHeader } from "@/components/MultiTenantHeader";

const Dashboard = () => {
  const { profile, stats } = useUserStore();
  
  const userStats = [
    { icon: Brain, label: "Requêtes IA", value: stats?.ai_queries?.toString() ?? "0", color: "text-blue-500" },
    { icon: Activity, label: "Incidents", value: stats?.total_incidents?.toString() ?? "0", color: "text-orange-500" },
    { icon: Workflow, label: "Workflows", value: stats?.workflows_count?.toString() ?? "0", color: "text-green-500" },
    { icon: Box, label: "Digital Twins", value: stats?.digital_twins_count?.toString() ?? "0", color: "text-purple-500" }
  ];

  const displayName = profile?.full_name || "Utilisateur";

  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen">
        <MultiTenantHeader />
        
        <div className="p-8 space-y-8 flex-1">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord de {displayName}</h1>
            <p className="text-muted-foreground">Votre espace personnel Cloud Industrie - Données isolées et sécurisées</p>
          </div>

          {/* User Stats Grid - Multi-tenant isolated */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userStats.map((stat, index) => (
              <Card key={index} variant="neumorphism">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    </div>
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Quick Actions */}
          <Card variant="neumorphismFlat">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
              <CardDescription>Gérez vos ressources personnelles</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button asChild variant="neumorphism">
                <Link to="/ai-assistant">Assistant IA</Link>
              </Button>
              <Button asChild variant="neumorphism">
                <Link to="/analytics">Mes analyses</Link>
              </Button>
              <Button asChild variant="neumorphism">
                <Link to="/settings">Paramètres</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Recent Activity - User specific */}
          <Card variant="neumorphismFlat">
            <CardHeader>
              <CardTitle>Votre activité récente</CardTitle>
              <CardDescription>Dernière connexion : {stats?.last_active ? new Date(stats.last_active).toLocaleString('fr-FR') : 'N/A'}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-background shadow-neu-inset rounded-xl">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Espace personnel actif</p>
                    <p className="text-xs text-muted-foreground">Vos données sont isolées et sécurisées</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background shadow-neu-inset rounded-xl">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stats?.ai_queries ?? 0} requêtes IA effectuées</p>
                    <p className="text-xs text-muted-foreground">Historique personnel conservé</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-background shadow-neu-inset rounded-xl">
                  <div className="h-2 w-2 rounded-full bg-purple-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{stats?.workflows_count ?? 0} workflows actifs</p>
                    <p className="text-xs text-muted-foreground">Automatisations personnelles</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
