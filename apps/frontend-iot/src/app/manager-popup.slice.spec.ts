import {
  fetchManagerPopup,
  managerPopupAdapter,
  managerPopupReducer,
} from './manager-popup.slice';

describe('managerPopup reducer', () => {
  it('should handle initial state', () => {
    const expected = managerPopupAdapter.getInitialState({
      loadingStatus: 'not loaded',
      error: null,
    });

    expect(managerPopupReducer(undefined, { type: '' })).toEqual(expected);
  });

  it('should handle fetchManagerPopups', () => {
    let state = managerPopupReducer(
      undefined,
      fetchManagerPopup.pending(null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loading',
        error: null,
        entities: {},
      })
    );

    state = managerPopupReducer(
      state,
      fetchManagerPopup.fulfilled([{ id: 1 }], null, null)
    );

    expect(state).toEqual(
      expect.objectContaining({
        loadingStatus: 'loaded',
        error: null,
        entities: { 1: { id: 1 } },
      })
    );

    state = managerPopupReducer(
      state,
      fetchManagerPopup.rejected(new Error('Uh oh'), null, null)
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
