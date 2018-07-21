import Common from '../constants/Common.constants';

export const appInitStart = () => ({
  type: Common.INIT_START
});

export const appInitFinish = () => ({
  type: Common.INIT_FINISH
});
