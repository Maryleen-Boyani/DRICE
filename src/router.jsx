import {
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import GrantsPage from './pages/GrantsPage';
import VCInnovationPage from './pages/VCInnovationPage';
import InternalResearchPage from './pages/InternalResearchPage';
import LeadershipPage from './pages/LeadershipPage';
import NewsPage from './pages/NewsPage';
import PublicationsPage from './pages/PublicationsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

const rootRoute = createRootRoute({ component: RootLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const grantsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/grants',
  component: GrantsPage,
});

const vcInnovationRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/grants/vc-innovation',
  component: VCInnovationPage,
});

const internalResearchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/grants/internal-research',
  component: InternalResearchPage,
});

const leadershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/leadership',
  component: LeadershipPage,
});

const newsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/news',
  component: NewsPage,
});

const publicationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/publications',
  component: PublicationsPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: NotFoundPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  grantsRoute,
  vcInnovationRoute,
  internalResearchRoute,
  leadershipRoute,
  newsRoute,
  publicationsRoute,
  contactRoute,
  notFoundRoute,
]);

export const router = createRouter({ routeTree });
