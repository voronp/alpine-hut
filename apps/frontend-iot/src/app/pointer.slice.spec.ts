import { fetchPointer, pointerAdapter, pointerReducer } from './pointer.slice';

describe('pointer reducer', () => {
  it('should handle initial state', () => {
    const expected = pointerAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(pointerReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchPointers', () => {
    let state = pointerReducer(undefined, fetchPointer.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = pointerReducer(
      state,
      fetchPointer.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = pointerReducer(
      state,
      fetchPointer.rejected(new Error('Uh oh'), null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'error',
        error: 'Uh oh',
        entities: { 1: { id: 1 } },
      })
    );
  });
});
