import devBlueprint from 'assets/blueprints/static/grouping.json';
import { importifyBlueprint } from 'core/API/blueprint';
import appState from 'core/stores/appState';
import blueprintState from 'core/stores/blueprintState';
import Layout from './components/Layout';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolBarTop from './components/ToolbarTop';
import './index.scss';

blueprintState.setState(importifyBlueprint(devBlueprint));

export default function Desktop() {
  const tab = appState((state) => state.tab);

  return (
    <div className="desktop-container">
      <ToolBarTop />
      <ToolbarBottom />

      <Layout style={{ display: tab === 'layout' ? 'flex' : 'none' }} />
      <Staging style={{ display: tab === 'staging' ? 'flex' : 'none' }} />
      <Simulation style={{ display: tab === 'simulation' ? 'flex' : 'none' }} />
      <Rendering style={{ display: tab === 'rendering' ? 'flex' : 'none' }} />
    </div>
  );
}
