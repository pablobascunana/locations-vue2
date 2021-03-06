import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import Vuex from 'vuex'

import user from '@/store/modules/user.js'

import '@/api/interceptors'

import HistoricalLocations from '@/views/HistoricalLocations.vue'

import * as historicalLocationsMock from '../mocks/historicalLocations.mock.js'

const Plugins = {
    install(Vue) {
      Vue.prototype.EventBus = new Vue();
    }
};

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.use(Plugins);
let vuetify = new Vuetify();

describe('Historical locations', () => {
    let wrapper;
    let store;
    let state = {};
    let actions = {};
    let modules = {
        user
    };
    const mocks = {
        EventBus: {
            $emit: jest.fn(),
        },
        $t: () => {'some specific text in any language'}
    };
    beforeEach(() => {
        store = new Vuex.Store({ state, actions, modules });

        wrapper = shallowMount(HistoricalLocations, {
            localVue,
            vuetify,
            store,
            mocks
        });
    });

    it("Should match snapshot", () => {
        expect(wrapper).toMatchSnapshot()    
    });

    it('Renders a vue instance', () => {
        expect(wrapper.isVueInstance()).toBe(true);
    });

    it('Call to show error snack bar function', () => {
        const showErrorSnackBarFn = jest.spyOn(wrapper.vm, 'showErrorSnackBar');
        wrapper.vm.showErrorSnackBar(500);
        expect(showErrorSnackBarFn).toBeCalled();
    });

    it('Call to update markers handler function', () => {
        const removeMarkersHandlerFn = jest.spyOn(wrapper.vm, 'removeMarkersHandler');
        wrapper.vm.removeMarkersHandler(historicalLocationsMock.MARKER);
        expect(removeMarkersHandlerFn).toBeCalled();
        expect(wrapper.vm.markers).toStrictEqual(historicalLocationsMock.MARKER);
    });

    it('Call to update markers handler function', () => {
        const addMarkersHandlerFn = jest.spyOn(wrapper.vm, 'addMarkersHandler');
        wrapper.vm.addMarkersHandler(historicalLocationsMock.MARKER);
        expect(addMarkersHandlerFn).toBeCalled();
        expect(wrapper.vm.markers).toStrictEqual(historicalLocationsMock.MARKER);
    });
});