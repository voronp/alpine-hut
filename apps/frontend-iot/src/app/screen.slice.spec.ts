import { fetchScreen, screenAdapter, screenReducer } from './screen.slice';

describe('screen reducer', () => {
  it('should handle initial state', () => {
    const expected = screenAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(screenReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchScreens', () => {
    let state = screenReducer(undefined, fetchScreen.pending(null, null));

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = screenReducer(
      state,
      fetchScreen.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = screenReducer(
      state,
      fetchScreen.rejected(new Error('Uh oh'), null, null)
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
