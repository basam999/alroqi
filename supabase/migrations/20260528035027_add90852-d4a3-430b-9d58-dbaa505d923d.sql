CREATE TABLE public.site_stats (
  id INT PRIMARY KEY DEFAULT 1,
  views BIGINT NOT NULL DEFAULT 0,
  CONSTRAINT single_row CHECK (id = 1)
);

INSERT INTO public.site_stats (id, views) VALUES (1, 3391);

GRANT SELECT ON public.site_stats TO anon, authenticated;
GRANT ALL ON public.site_stats TO service_role;

ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read stats" ON public.site_stats
  FOR SELECT TO anon, authenticated USING (true);

CREATE OR REPLACE FUNCTION public.increment_views()
RETURNS BIGINT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_count BIGINT;
BEGIN
  UPDATE public.site_stats
  SET views = views + 1
  WHERE id = 1
  RETURNING views INTO new_count;
  RETURN new_count;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_views() TO anon, authenticated;