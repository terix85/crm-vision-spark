import { DashboardLayout } from "@/components/DashboardLayout";
import { MultiTenantHeader } from "@/components/MultiTenantHeader";
import { CustomizableDashboard } from "@/components/CustomizableDashboard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col min-h-screen">
        <MultiTenantHeader />
        
        <div className="p-8 space-y-8 flex-1">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Mon Dashboard</h1>
            <p className="text-muted-foreground">Votre espace personnel Cloud Industrie - Personnalisez vos widgets</p>
          </div>

          <CustomizableDashboard />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
