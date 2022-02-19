import useKeybinds from 'hooks/useKeybinds';
import appStore from 'stores/app';
import Layout from './components/Layout';
import Rendering from './components/Rendering';
import Simulation from './components/Simulation';
import Staging from './components/Staging';
import ToolbarBottom from './components/ToolbarBottom';
import ToolbarTop from './components/ToolbarTop';
import styles from './index.module.scss';

export default function Desktop() {
  const tab = appStore((state) => state.tab);

  useKeybinds();

  return (
    <div className={styles['desktop-container']}>
      <ToolbarTop />
      <ToolbarBottom />

      <Layout style={{ display: tab === 'layout' ? undefined : 'none' }} />
      <Staging style={{ display: tab === 'staging' ? undefined : 'none' }} />
      <Simulation
        style={{ display: tab === 'simulation' ? undefined : 'none' }}
      />
      <Rendering
        style={{ display: tab === 'rendering' ? undefined : 'none' }}
      />
    </div>
  );
}
