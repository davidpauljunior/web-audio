const sounds = require('../../src/js/modules/sounds');

test('the fetch fails with an error', async () => {
    expect.assertions(1);
});

// const spy = jest.spyOn(console, 'log'); // Mocked function
    // const init = loopingTriangle.init();

    // expect(spy).toHaveBeenCalled();
    // expect(spy.mock.calls.length).toBe(7);

    /**
     * Note that spy.mock.calls returns
     * an array of arrays, where each call 
     * is an array within the mock.calls array.
     * e.g. spy.mock.calls outputs
     * [ ['#'], ['##'], ['###'], ['####'], ['#####'], ['######'], ['#######'] ]
     * So to get the first, you need to do spy.mock.calls[0][0];
     */
    // expect(spy.mock.calls[0][0]).toBe('#');
    // expect(spy.mock.calls[6][0]).toBe('#######');

    /**
     * You can achieve the above using destructuring 
     * too, but it feels much less readible.
     * It defines 'first' as the array in the .calls
     * array, which will give the first item.
     * The commas represent the number of items 
     * prior to the one you want.

    const [[first]] = spy.mock.calls;
    const [,,,,,,[seventh]] = spy.mock.calls;

    expect(first).toBe('#');
    expect(seventh).toBe('#######');
    */

    // spy.mockReset();
    // spy.mockRestore();