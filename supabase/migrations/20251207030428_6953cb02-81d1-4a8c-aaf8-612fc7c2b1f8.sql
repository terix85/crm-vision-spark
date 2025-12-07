-- Table pour les dashboards personnalisés par utilisateur
CREATE TABLE public.user_dashboards (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  layout JSONB DEFAULT '{"columns": 4, "rows": 3}'::jsonb,
  widgets JSONB DEFAULT '[]'::jsonb,
  theme JSONB DEFAULT '{"primary": "blue", "mode": "light"}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Table pour les statistiques personnelles par utilisateur
CREATE TABLE public.user_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  total_incidents INTEGER DEFAULT 0,
  ai_queries INTEGER DEFAULT 0,
  workflows_count INTEGER DEFAULT 0,
  digital_twins_count INTEGER DEFAULT 0,
  last_active TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Table pour les workflows IA par utilisateur
CREATE TABLE public.user_workflows (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  config JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'draft',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table pour les digital twins par utilisateur
CREATE TABLE public.digital_twins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  config JSONB DEFAULT '{}'::jsonb,
  data JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.user_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.digital_twins ENABLE ROW LEVEL SECURITY;

-- RLS Policies for user_dashboards (strict user isolation)
CREATE POLICY "Users can view their own dashboard" ON public.user_dashboards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own dashboard" ON public.user_dashboards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dashboard" ON public.user_dashboards
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_stats (strict user isolation)
CREATE POLICY "Users can view their own stats" ON public.user_stats
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own stats" ON public.user_stats
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stats" ON public.user_stats
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for user_workflows (strict user isolation)
CREATE POLICY "Users can view their own workflows" ON public.user_workflows
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own workflows" ON public.user_workflows
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflows" ON public.user_workflows
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows" ON public.user_workflows
  FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for digital_twins (strict user isolation)
CREATE POLICY "Users can view their own digital twins" ON public.digital_twins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own digital twins" ON public.digital_twins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own digital twins" ON public.digital_twins
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own digital twins" ON public.digital_twins
  FOR DELETE USING (auth.uid() = user_id);

-- Trigger for updated_at on all new tables
CREATE TRIGGER update_user_dashboards_updated_at
  BEFORE UPDATE ON public.user_dashboards
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_stats_updated_at
  BEFORE UPDATE ON public.user_stats
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_user_workflows_updated_at
  BEFORE UPDATE ON public.user_workflows
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_digital_twins_updated_at
  BEFORE UPDATE ON public.digital_twins
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();