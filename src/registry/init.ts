import { pick } from 'lodash-es';
import { initMiniStar, regDependency } from 'mini-star';
import { useRegistryStore } from './store';

const registry = [
  {
    name: 'easemob',
    label: 'easemob',
    url: './plugins/easemob/index.js',
  },
];

export async function initRegistry() {
  regDependency('react', () => import('react'));
  regDependency('codeck', () => import('../visualeditor'));

  await initMiniStar({
    plugins: registry.map((r) => pick(r, ['name', 'url'])),
  });
  useRegistryStore.setState({ inited: true });
}


export const preventDefault = () => {
  window.addEventListener("keydown",(event)=>{
      event.preventDefault()
  })
}