import ProtectedRoute from "@/components/ProtectedRoute";
import { Layout } from "@/layouts/Layout";
import { SideBar } from "@/layouts/SideBar";
import { useSaveStore } from "@/stores/saveStore";
import { HomeView } from "@/views/home";
import loadable from "@loadable/component";
import { startTransition, Suspense, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

const CreateResources = loadable(() => import("./views/resources"));
const CreateSeason = loadable(() => import("./views/season"));
const CreateDwarf = loadable(() => import("./views/dwarf"));

function App() {
  const { isLoaded } = useSaveStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded) {
      CreateResources.preload();
      CreateSeason.preload();
      CreateDwarf.preload();

      startTransition(() => {
        navigate("/resources");
      });
    }
  }, [isLoaded]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomeView />} />
        <Route element={<ProtectedRoute allowed={isLoaded} />}>
          <Route element={<SideBar />}>
            <Route
              path="/resources"
              element={
                <Suspense>
                  <CreateResources />
                </Suspense>
              }
            />
            <Route
              path="/season"
              element={
                <Suspense>
                  <CreateSeason />
                </Suspense>
              }
            />
            <Route
              path="/dwarf/:dwarf"
              element={
                <Suspense>
                  <CreateDwarf />
                </Suspense>
              }
            />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
