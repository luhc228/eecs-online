/**
 * 定义redux使用的公共接口
 */
import { EffectsCommandMap } from 'dva';
import { AnyAction } from 'redux';

export type Effect<H> = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: H) => T) => T },
) => void;
