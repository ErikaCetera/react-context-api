import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import PostPage from "./pages/post/PostPage";
import CreatePage from "./pages/post/CreatePage";
import ShowPage from "./pages/post/ShowPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<HomePage />} />
              <Route path="/posts" >
              <Route index element={<PostPage />} />
              <Route path="create" element={<CreatePage />} />
              <Route path=":id" element={<ShowPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
         </Route>
        </Routes>
      </BrowserRouter >
    </>
  );
}

export default App;
