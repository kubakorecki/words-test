
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
var app = (function () {
    'use strict';

    function noop() { }
    function assign(tar, src) {
        // @ts-ignore
        for (const k in src)
            tar[k] = src[k];
        return tar;
    }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function create_slot(definition, ctx, $$scope, fn) {
        if (definition) {
            const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
            return definition[0](slot_ctx);
        }
    }
    function get_slot_context(definition, ctx, $$scope, fn) {
        return definition[1] && fn
            ? assign($$scope.ctx.slice(), definition[1](fn(ctx)))
            : $$scope.ctx;
    }
    function get_slot_changes(definition, $$scope, dirty, fn) {
        if (definition[2] && fn) {
            const lets = definition[2](fn(dirty));
            if ($$scope.dirty === undefined) {
                return lets;
            }
            if (typeof lets === 'object') {
                const merged = [];
                const len = Math.max($$scope.dirty.length, lets.length);
                for (let i = 0; i < len; i += 1) {
                    merged[i] = $$scope.dirty[i] | lets[i];
                }
                return merged;
            }
            return $$scope.dirty | lets;
        }
        return $$scope.dirty;
    }
    function update_slot(slot, slot_definition, ctx, $$scope, dirty, get_slot_changes_fn, get_slot_context_fn) {
        const slot_changes = get_slot_changes(slot_definition, $$scope, dirty, get_slot_changes_fn);
        if (slot_changes) {
            const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
            slot.p(slot_context, slot_changes);
        }
    }
    function null_to_empty(value) {
        return value == null ? '' : value;
    }

    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function prevent_default(fn) {
        return function (event) {
            event.preventDefault();
            // @ts-ignore
            return fn.call(this, event);
        };
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function set_style(node, key, value, important) {
        node.style.setProperty(key, value, important ? 'important' : '');
    }
    function custom_event(type, detail) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, false, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function onMount(fn) {
        get_current_component().$$.on_mount.push(fn);
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    let flushing = false;
    const seen_callbacks = new Set();
    function flush() {
        if (flushing)
            return;
        flushing = true;
        do {
            // first, call beforeUpdate functions
            // and update components
            for (let i = 0; i < dirty_components.length; i += 1) {
                const component = dirty_components[i];
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        flushing = false;
        seen_callbacks.clear();
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function group_outros() {
        outros = {
            r: 0,
            c: [],
            p: outros // parent group
        };
    }
    function check_outros() {
        if (!outros.r) {
            run_all(outros.c);
        }
        outros = outros.p;
    }
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        // onMount happens before the initial afterUpdate
        add_render_callback(() => {
            const new_on_destroy = on_mount.map(run).filter(is_function);
            if (on_destroy) {
                on_destroy.push(...new_on_destroy);
            }
            else {
                // Edge case - component was destroyed immediately,
                // most likely as a result of a binding initialising
                run_all(new_on_destroy);
            }
            component.$$.on_mount = [];
        });
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            before_update: [],
            after_update: [],
            context: new Map(parent_component ? parent_component.$$.context : []),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false
        };
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.32.1' }, detail)));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src/components/Button.svelte generated by Svelte v3.32.1 */

    const file = "src/components/Button.svelte";

    function create_fragment(ctx) {
    	let button;
    	let current;
    	let mounted;
    	let dispose;
    	const default_slot_template = /*#slots*/ ctx[2].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[1], null);

    	const block = {
    		c: function create() {
    			button = element("button");
    			if (default_slot) default_slot.c();
    			attr_dev(button, "class", "svelte-14p8jzr");
    			add_location(button, file, 4, 0, 51);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, button, anchor);

    			if (default_slot) {
    				default_slot.m(button, null);
    			}

    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(
    					button,
    					"click",
    					function () {
    						if (is_function(/*click*/ ctx[0])) /*click*/ ctx[0].apply(this, arguments);
    					},
    					false,
    					false,
    					false
    				);

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, [dirty]) {
    			ctx = new_ctx;

    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 2) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[1], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(button);
    			if (default_slot) default_slot.d(detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Button", slots, ['default']);

    	let { click = () => {
    		
    	} } = $$props;

    	const writable_props = ["click"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Button> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("click" in $$props) $$invalidate(0, click = $$props.click);
    		if ("$$scope" in $$props) $$invalidate(1, $$scope = $$props.$$scope);
    	};

    	$$self.$capture_state = () => ({ click });

    	$$self.$inject_state = $$props => {
    		if ("click" in $$props) $$invalidate(0, click = $$props.click);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [click, $$scope, slots];
    }

    class Button extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, { click: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Button",
    			options,
    			id: create_fragment.name
    		});
    	}

    	get click() {
    		throw new Error("<Button>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set click(value) {
    		throw new Error("<Button>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/MainContainer.svelte generated by Svelte v3.32.1 */

    const file$1 = "src/components/MainContainer.svelte";

    function create_fragment$1(ctx) {
    	let div;
    	let main;
    	let current;
    	const default_slot_template = /*#slots*/ ctx[1].default;
    	const default_slot = create_slot(default_slot_template, ctx, /*$$scope*/ ctx[0], null);

    	const block = {
    		c: function create() {
    			div = element("div");
    			main = element("main");
    			if (default_slot) default_slot.c();
    			attr_dev(main, "class", "svelte-q90l09");
    			add_location(main, file$1, 1, 2, 8);
    			attr_dev(div, "class", "svelte-q90l09");
    			add_location(div, file$1, 0, 0, 0);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, main);

    			if (default_slot) {
    				default_slot.m(main, null);
    			}

    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (default_slot) {
    				if (default_slot.p && dirty & /*$$scope*/ 1) {
    					update_slot(default_slot, default_slot_template, ctx, /*$$scope*/ ctx[0], dirty, null, null);
    				}
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(default_slot, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(default_slot, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (default_slot) default_slot.d(detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("MainContainer", slots, ['default']);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<MainContainer> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("$$scope" in $$props) $$invalidate(0, $$scope = $$props.$$scope);
    	};

    	return [$$scope, slots];
    }

    class MainContainer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "MainContainer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src/components/Counter.svelte generated by Svelte v3.32.1 */

    const file$2 = "src/components/Counter.svelte";

    // (8:0) {:else}
    function create_else_block(ctx) {
    	let div;
    	let t0;
    	let t1;
    	let t2;

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(/*current*/ ctx[0]);
    			t1 = text("/");
    			t2 = text(/*max*/ ctx[1]);
    			attr_dev(div, "class", "fill svelte-aothut");
    			set_style(div, "width", /*current*/ ctx[0] / /*max*/ ctx[1] * 100 + "%");
    			add_location(div, file$2, 8, 2, 177);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			append_dev(div, t2);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*current*/ 1) set_data_dev(t0, /*current*/ ctx[0]);
    			if (dirty & /*max*/ 2) set_data_dev(t2, /*max*/ ctx[1]);

    			if (dirty & /*current, max*/ 3) {
    				set_style(div, "width", /*current*/ ctx[0] / /*max*/ ctx[1] * 100 + "%");
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block.name,
    		type: "else",
    		source: "(8:0) {:else}",
    		ctx
    	});

    	return block;
    }

    // (6:0) {#if current > max}
    function create_if_block(ctx) {
    	let div;

    	const block = {
    		c: function create() {
    			div = element("div");
    			div.textContent = "PODSUMOWANIE";
    			attr_dev(div, "class", "fill svelte-aothut");
    			set_style(div, "width", "100%");
    			add_location(div, file$2, 6, 2, 110);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(6:0) {#if current > max}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let div;

    	function select_block_type(ctx, dirty) {
    		if (/*current*/ ctx[0] > /*max*/ ctx[1]) return create_if_block;
    		return create_else_block;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			div = element("div");
    			if_block.c();
    			attr_dev(div, "class", "parent svelte-aothut");
    			add_location(div, file$2, 4, 0, 67);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			if_block.m(div, null);
    		},
    		p: function update(ctx, [dirty]) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(div, null);
    				}
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if_block.d();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Counter", slots, []);
    	let { current = 1 } = $$props;
    	let { max = 3 } = $$props;
    	const writable_props = ["current", "max"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Counter> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("current" in $$props) $$invalidate(0, current = $$props.current);
    		if ("max" in $$props) $$invalidate(1, max = $$props.max);
    	};

    	$$self.$capture_state = () => ({ current, max });

    	$$self.$inject_state = $$props => {
    		if ("current" in $$props) $$invalidate(0, current = $$props.current);
    		if ("max" in $$props) $$invalidate(1, max = $$props.max);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [current, max];
    }

    class Counter extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { current: 0, max: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Counter",
    			options,
    			id: create_fragment$2.name
    		});
    	}

    	get current() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set current(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get max() {
    		throw new Error("<Counter>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set max(value) {
    		throw new Error("<Counter>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
    };

    const getWordDescription = (word) => {
      if (Array.isArray(word)) {
        return word[0];
      } else {
        return word;
      }
    };

    /* src/components/Summary.svelte generated by Svelte v3.32.1 */
    const file$3 = "src/components/Summary.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[4] = list[i];
    	return child_ctx;
    }

    // (17:6) {:else}
    function create_else_block$1(ctx) {
    	let li;
    	let t0_value = getWordDescription(/*word*/ ctx[4].pl) + "";
    	let t0;
    	let t1;
    	let t2_value = /*word*/ ctx[4].en + "";
    	let t2;
    	let t3;
    	let t4_value = /*word*/ ctx[4].answer + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(" : ");
    			t2 = text(t2_value);
    			t3 = text(" (");
    			t4 = text(t4_value);
    			t5 = text(")");
    			attr_dev(li, "class", "wrong-answer svelte-1s2p1u1");
    			add_location(li, file$3, 17, 8, 543);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    			append_dev(li, t3);
    			append_dev(li, t4);
    			append_dev(li, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedWords*/ 1 && t0_value !== (t0_value = getWordDescription(/*word*/ ctx[4].pl) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*selectedWords*/ 1 && t2_value !== (t2_value = /*word*/ ctx[4].en + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*selectedWords*/ 1 && t4_value !== (t4_value = /*word*/ ctx[4].answer + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$1.name,
    		type: "else",
    		source: "(17:6) {:else}",
    		ctx
    	});

    	return block;
    }

    // (15:6) {#if word.points > 0}
    function create_if_block$1(ctx) {
    	let li;
    	let t0_value = getWordDescription(/*word*/ ctx[4].pl) + "";
    	let t0;
    	let t1;
    	let t2_value = /*word*/ ctx[4].en + "";
    	let t2;
    	let t3;
    	let t4_value = /*word*/ ctx[4].answer + "";
    	let t4;
    	let t5;

    	const block = {
    		c: function create() {
    			li = element("li");
    			t0 = text(t0_value);
    			t1 = text(" : ");
    			t2 = text(t2_value);
    			t3 = text(" (");
    			t4 = text(t4_value);
    			t5 = text(")");
    			attr_dev(li, "class", "correct-answer svelte-1s2p1u1");
    			add_location(li, file$3, 15, 8, 431);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, li, anchor);
    			append_dev(li, t0);
    			append_dev(li, t1);
    			append_dev(li, t2);
    			append_dev(li, t3);
    			append_dev(li, t4);
    			append_dev(li, t5);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedWords*/ 1 && t0_value !== (t0_value = getWordDescription(/*word*/ ctx[4].pl) + "")) set_data_dev(t0, t0_value);
    			if (dirty & /*selectedWords*/ 1 && t2_value !== (t2_value = /*word*/ ctx[4].en + "")) set_data_dev(t2, t2_value);
    			if (dirty & /*selectedWords*/ 1 && t4_value !== (t4_value = /*word*/ ctx[4].answer + "")) set_data_dev(t4, t4_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(li);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(15:6) {#if word.points > 0}",
    		ctx
    	});

    	return block;
    }

    // (14:4) {#each selectedWords as word}
    function create_each_block(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*word*/ ctx[4].points > 0) return create_if_block$1;
    		return create_else_block$1;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if_block.d(1);
    				if_block = current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(14:4) {#each selectedWords as word}",
    		ctx
    	});

    	return block;
    }

    // (24:2) <Button click={retry}>
    function create_default_slot(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Powtórz");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot.name,
    		type: "slot",
    		source: "(24:2) <Button click={retry}>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let div1;
    	let div0;
    	let t0_value = Math.round(/*score*/ ctx[1] / /*wordsLength*/ ctx[2] * 10000) / 100 + "";
    	let t0;
    	let t1;
    	let t2;
    	let t3;
    	let t4;
    	let t5;
    	let t6;
    	let ol;
    	let t7;
    	let button;
    	let current;
    	let each_value = /*selectedWords*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	button = new Button({
    			props: {
    				click: /*retry*/ ctx[3],
    				$$slots: { default: [create_default_slot] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			div0 = element("div");
    			t0 = text(t0_value);
    			t1 = text(" % (");
    			t2 = text(/*score*/ ctx[1]);
    			t3 = text("/");
    			t4 = text(/*wordsLength*/ ctx[2]);
    			t5 = text(")");
    			t6 = space();
    			ol = element("ol");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t7 = space();
    			create_component(button.$$.fragment);
    			attr_dev(div0, "class", "score svelte-1s2p1u1");
    			add_location(div0, file$3, 11, 2, 255);
    			add_location(ol, file$3, 12, 2, 356);
    			attr_dev(div1, "class", "summary svelte-1s2p1u1");
    			add_location(div1, file$3, 10, 0, 231);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, div0);
    			append_dev(div0, t0);
    			append_dev(div0, t1);
    			append_dev(div0, t2);
    			append_dev(div0, t3);
    			append_dev(div0, t4);
    			append_dev(div0, t5);
    			append_dev(div1, t6);
    			append_dev(div1, ol);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(ol, null);
    			}

    			append_dev(div1, t7);
    			mount_component(button, div1, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if ((!current || dirty & /*score, wordsLength*/ 6) && t0_value !== (t0_value = Math.round(/*score*/ ctx[1] / /*wordsLength*/ ctx[2] * 10000) / 100 + "")) set_data_dev(t0, t0_value);
    			if (!current || dirty & /*score*/ 2) set_data_dev(t2, /*score*/ ctx[1]);
    			if (!current || dirty & /*wordsLength*/ 4) set_data_dev(t4, /*wordsLength*/ ctx[2]);

    			if (dirty & /*selectedWords, getWordDescription*/ 1) {
    				each_value = /*selectedWords*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(ol, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const button_changes = {};
    			if (dirty & /*retry*/ 8) button_changes.click = /*retry*/ ctx[3];

    			if (dirty & /*$$scope*/ 128) {
    				button_changes.$$scope = { dirty, ctx };
    			}

    			button.$set(button_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(button.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(button.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			destroy_each(each_blocks, detaching);
    			destroy_component(button);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Summary", slots, []);
    	let { selectedWords = [] } = $$props;
    	let { score = 1 } = $$props;
    	let { wordsLength = 1 } = $$props;

    	let { retry = () => {
    		
    	} } = $$props;

    	const writable_props = ["selectedWords", "score", "wordsLength", "retry"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Summary> was created with unknown prop '${key}'`);
    	});

    	$$self.$$set = $$props => {
    		if ("selectedWords" in $$props) $$invalidate(0, selectedWords = $$props.selectedWords);
    		if ("score" in $$props) $$invalidate(1, score = $$props.score);
    		if ("wordsLength" in $$props) $$invalidate(2, wordsLength = $$props.wordsLength);
    		if ("retry" in $$props) $$invalidate(3, retry = $$props.retry);
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		getWordDescription,
    		selectedWords,
    		score,
    		wordsLength,
    		retry
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectedWords" in $$props) $$invalidate(0, selectedWords = $$props.selectedWords);
    		if ("score" in $$props) $$invalidate(1, score = $$props.score);
    		if ("wordsLength" in $$props) $$invalidate(2, wordsLength = $$props.wordsLength);
    		if ("retry" in $$props) $$invalidate(3, retry = $$props.retry);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [selectedWords, score, wordsLength, retry];
    }

    class Summary extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {
    			selectedWords: 0,
    			score: 1,
    			wordsLength: 2,
    			retry: 3
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Summary",
    			options,
    			id: create_fragment$3.name
    		});
    	}

    	get selectedWords() {
    		throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set selectedWords(value) {
    		throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get score() {
    		throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set score(value) {
    		throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wordsLength() {
    		throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wordsLength(value) {
    		throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get retry() {
    		throw new Error("<Summary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set retry(value) {
    		throw new Error("<Summary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/TextInput.svelte generated by Svelte v3.32.1 */

    const file$4 = "src/components/TextInput.svelte";

    // (13:0) {#if label}
    function create_if_block$2(ctx) {
    	let label_1;
    	let t;

    	const block = {
    		c: function create() {
    			label_1 = element("label");
    			t = text(/*label*/ ctx[2]);
    			attr_dev(label_1, "for", /*label*/ ctx[2]);
    			attr_dev(label_1, "class", "svelte-13xnp9p");
    			add_location(label_1, file$4, 13, 0, 204);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, label_1, anchor);
    			append_dev(label_1, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*label*/ 4) set_data_dev(t, /*label*/ ctx[2]);

    			if (dirty & /*label*/ 4) {
    				attr_dev(label_1, "for", /*label*/ ctx[2]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(label_1);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(13:0) {#if label}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let t;
    	let input;
    	let input_class_value;
    	let mounted;
    	let dispose;
    	let if_block = /*label*/ ctx[2] && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			t = space();
    			input = element("input");
    			attr_dev(input, "name", /*label*/ ctx[2]);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "class", input_class_value = "" + (null_to_empty(/*readonly*/ ctx[3]) + " svelte-13xnp9p"));
    			input.readOnly = /*readonly*/ ctx[3];
    			add_location(input, file$4, 15, 0, 247);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, t, anchor);
    			insert_dev(target, input, anchor);
    			/*input_binding*/ ctx[5](input);
    			set_input_value(input, /*value*/ ctx[0]);

    			if (!mounted) {
    				dispose = listen_dev(input, "input", /*input_input_handler*/ ctx[6]);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*label*/ ctx[2]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(t.parentNode, t);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			if (dirty & /*label*/ 4) {
    				attr_dev(input, "name", /*label*/ ctx[2]);
    			}

    			if (dirty & /*readonly*/ 8 && input_class_value !== (input_class_value = "" + (null_to_empty(/*readonly*/ ctx[3]) + " svelte-13xnp9p"))) {
    				attr_dev(input, "class", input_class_value);
    			}

    			if (dirty & /*readonly*/ 8) {
    				prop_dev(input, "readOnly", /*readonly*/ ctx[3]);
    			}

    			if (dirty & /*value*/ 1 && input.value !== /*value*/ ctx[0]) {
    				set_input_value(input, /*value*/ ctx[0]);
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(t);
    			if (detaching) detach_dev(input);
    			/*input_binding*/ ctx[5](null);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("TextInput", slots, []);
    	let { value = "" } = $$props;
    	let { readOnly = false } = $$props;
    	let { ref = null } = $$props;
    	let { label = "" } = $$props;
    	let readonly = "";
    	if (readOnly) readonly = "readonly";
    	const writable_props = ["value", "readOnly", "ref", "label"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<TextInput> was created with unknown prop '${key}'`);
    	});

    	function input_binding($$value) {
    		binding_callbacks[$$value ? "unshift" : "push"](() => {
    			ref = $$value;
    			$$invalidate(1, ref);
    		});
    	}

    	function input_input_handler() {
    		value = this.value;
    		$$invalidate(0, value);
    	}

    	$$self.$$set = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("readOnly" in $$props) $$invalidate(4, readOnly = $$props.readOnly);
    		if ("ref" in $$props) $$invalidate(1, ref = $$props.ref);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    	};

    	$$self.$capture_state = () => ({ value, readOnly, ref, label, readonly });

    	$$self.$inject_state = $$props => {
    		if ("value" in $$props) $$invalidate(0, value = $$props.value);
    		if ("readOnly" in $$props) $$invalidate(4, readOnly = $$props.readOnly);
    		if ("ref" in $$props) $$invalidate(1, ref = $$props.ref);
    		if ("label" in $$props) $$invalidate(2, label = $$props.label);
    		if ("readonly" in $$props) $$invalidate(3, readonly = $$props.readonly);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [value, ref, label, readonly, readOnly, input_binding, input_input_handler];
    }

    class TextInput extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, { value: 0, readOnly: 4, ref: 1, label: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "TextInput",
    			options,
    			id: create_fragment$4.name
    		});
    	}

    	get value() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set value(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get readOnly() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set readOnly(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get ref() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set ref(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get label() {
    		throw new Error("<TextInput>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set label(value) {
    		throw new Error("<TextInput>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src/components/Quiz.svelte generated by Svelte v3.32.1 */
    const file$5 = "src/components/Quiz.svelte";

    // (96:2) {:else}
    function create_else_block$2(ctx) {
    	let summary;
    	let current;

    	summary = new Summary({
    			props: {
    				selectedWords: /*selectedWords*/ ctx[2],
    				wordsLength: /*wordsLength*/ ctx[0],
    				score: /*score*/ ctx[5],
    				retry: /*retry*/ ctx[8]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(summary.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(summary, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const summary_changes = {};
    			if (dirty & /*selectedWords*/ 4) summary_changes.selectedWords = /*selectedWords*/ ctx[2];
    			if (dirty & /*wordsLength*/ 1) summary_changes.wordsLength = /*wordsLength*/ ctx[0];
    			if (dirty & /*score*/ 32) summary_changes.score = /*score*/ ctx[5];
    			summary.$set(summary_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(summary.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(summary.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(summary, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$2.name,
    		type: "else",
    		source: "(96:2) {:else}",
    		ctx
    	});

    	return block;
    }

    // (84:2) {#if index < wordsLength}
    function create_if_block$3(ctx) {
    	let div;
    	let t0_value = getWordDescription(/*selectedWords*/ ctx[2][/*index*/ ctx[3]].pl) + "";
    	let t0;
    	let t1;
    	let t2;
    	let form;
    	let textinput;
    	let updating_value;
    	let updating_ref;
    	let t3;
    	let input;
    	let current;
    	let mounted;
    	let dispose;
    	let if_block = /*showCorrectAnswer*/ ctx[6] && create_if_block_1(ctx);

    	function textinput_value_binding(value) {
    		/*textinput_value_binding*/ ctx[11].call(null, value);
    	}

    	function textinput_ref_binding(value) {
    		/*textinput_ref_binding*/ ctx[12].call(null, value);
    	}

    	let textinput_props = { readOnly: /*readOnly*/ ctx[7] };

    	if (/*answer*/ ctx[4] !== void 0) {
    		textinput_props.value = /*answer*/ ctx[4];
    	}

    	if (/*answerInput*/ ctx[1] !== void 0) {
    		textinput_props.ref = /*answerInput*/ ctx[1];
    	}

    	textinput = new TextInput({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, "value", textinput_value_binding));
    	binding_callbacks.push(() => bind(textinput, "ref", textinput_ref_binding));

    	const block = {
    		c: function create() {
    			div = element("div");
    			t0 = text(t0_value);
    			t1 = space();
    			if (if_block) if_block.c();
    			t2 = space();
    			form = element("form");
    			create_component(textinput.$$.fragment);
    			t3 = space();
    			input = element("input");
    			attr_dev(div, "class", "word svelte-1dljkvc");
    			add_location(div, file$5, 84, 3, 1670);
    			attr_dev(input, "type", "submit");
    			input.value = "Dalej";
    			attr_dev(input, "class", "svelte-1dljkvc");
    			add_location(input, file$5, 93, 4, 2005);
    			attr_dev(form, "spellcheck", "false");
    			add_location(form, file$5, 91, 3, 1854);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div, anchor);
    			append_dev(div, t0);
    			append_dev(div, t1);
    			if (if_block) if_block.m(div, null);
    			insert_dev(target, t2, anchor);
    			insert_dev(target, form, anchor);
    			mount_component(textinput, form, null);
    			append_dev(form, t3);
    			append_dev(form, input);
    			current = true;

    			if (!mounted) {
    				dispose = listen_dev(form, "submit", prevent_default(/*submitAnswer*/ ctx[9]), false, true, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if ((!current || dirty & /*selectedWords, index*/ 12) && t0_value !== (t0_value = getWordDescription(/*selectedWords*/ ctx[2][/*index*/ ctx[3]].pl) + "")) set_data_dev(t0, t0_value);

    			if (/*showCorrectAnswer*/ ctx[6]) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block_1(ctx);
    					if_block.c();
    					if_block.m(div, null);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}

    			const textinput_changes = {};
    			if (dirty & /*readOnly*/ 128) textinput_changes.readOnly = /*readOnly*/ ctx[7];

    			if (!updating_value && dirty & /*answer*/ 16) {
    				updating_value = true;
    				textinput_changes.value = /*answer*/ ctx[4];
    				add_flush_callback(() => updating_value = false);
    			}

    			if (!updating_ref && dirty & /*answerInput*/ 2) {
    				updating_ref = true;
    				textinput_changes.ref = /*answerInput*/ ctx[1];
    				add_flush_callback(() => updating_ref = false);
    			}

    			textinput.$set(textinput_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div);
    			if (if_block) if_block.d();
    			if (detaching) detach_dev(t2);
    			if (detaching) detach_dev(form);
    			destroy_component(textinput);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(84:2) {#if index < wordsLength}",
    		ctx
    	});

    	return block;
    }

    // (87:4) {#if showCorrectAnswer}
    function create_if_block_1(ctx) {
    	let t0;
    	let span;
    	let t1_value = /*selectedWords*/ ctx[2][/*index*/ ctx[3]].en + "";
    	let t1;

    	const block = {
    		c: function create() {
    			t0 = text("- ");
    			span = element("span");
    			t1 = text(t1_value);
    			attr_dev(span, "class", "hint svelte-1dljkvc");
    			add_location(span, file$5, 87, 7, 1774);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t0, anchor);
    			insert_dev(target, span, anchor);
    			append_dev(span, t1);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*selectedWords, index*/ 12 && t1_value !== (t1_value = /*selectedWords*/ ctx[2][/*index*/ ctx[3]].en + "")) set_data_dev(t1, t1_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(span);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(87:4) {#if showCorrectAnswer}",
    		ctx
    	});

    	return block;
    }

    // (83:1) <MainContainer>
    function create_default_slot$1(ctx) {
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$3, create_else_block$2];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*index*/ ctx[3] < /*wordsLength*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$1.name,
    		type: "slot",
    		source: "(83:1) <MainContainer>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let counter;
    	let t;
    	let maincontainer;
    	let current;

    	counter = new Counter({
    			props: {
    				current: /*index*/ ctx[3] + 1,
    				max: /*wordsLength*/ ctx[0]
    			},
    			$$inline: true
    		});

    	maincontainer = new MainContainer({
    			props: {
    				$$slots: { default: [create_default_slot$1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(counter.$$.fragment);
    			t = space();
    			create_component(maincontainer.$$.fragment);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			mount_component(counter, target, anchor);
    			insert_dev(target, t, anchor);
    			mount_component(maincontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			const counter_changes = {};
    			if (dirty & /*index*/ 8) counter_changes.current = /*index*/ ctx[3] + 1;
    			if (dirty & /*wordsLength*/ 1) counter_changes.max = /*wordsLength*/ ctx[0];
    			counter.$set(counter_changes);
    			const maincontainer_changes = {};

    			if (dirty & /*$$scope, readOnly, answer, answerInput, selectedWords, index, showCorrectAnswer, wordsLength, score*/ 8447) {
    				maincontainer_changes.$$scope = { dirty, ctx };
    			}

    			maincontainer.$set(maincontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(counter.$$.fragment, local);
    			transition_in(maincontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(counter.$$.fragment, local);
    			transition_out(maincontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(counter, detaching);
    			if (detaching) detach_dev(t);
    			destroy_component(maincontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("Quiz", slots, []);
    	let { words } = $$props;
    	let { wordsLength = 10 } = $$props;

    	if (wordsLength > words.length) {
    		wordsLength = words.length;
    	}

    	let answerInput;
    	shuffleArray(words);
    	let selectedWords = words.slice(0, wordsLength);
    	let index = 0;
    	let answer = "";
    	let score = 0;
    	let showCorrectAnswer = false;
    	let readOnly = false;

    	const retry = () => {
    		shuffleArray(words);
    		$$invalidate(2, selectedWords = words.slice(0, wordsLength));
    		$$invalidate(3, index = 0);
    		$$invalidate(4, answer = "");
    		$$invalidate(5, score = 0);

    		setTimeout(
    			() => {
    				answerInput.focus();
    			},
    			1
    		);
    	};

    	const submitAnswer = () => {
    		if (showCorrectAnswer == true) {
    			$$invalidate(6, showCorrectAnswer = false);
    			$$invalidate(4, answer = "");
    			$$invalidate(3, index++, index);
    			answerInput.focus();
    			$$invalidate(7, readOnly = false);
    			return;
    		}

    		$$invalidate(2, selectedWords[index].answer = answer, selectedWords);
    		const correctAnswer = selectedWords[index].en;
    		let correct = false;

    		if (Array.isArray(correctAnswer)) {
    			if (correctAnswer.includes(answer)) {
    				correct = true;
    			}
    		} else if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
    			correct = true;
    		}

    		if (correct) {
    			$$invalidate(5, score++, score);
    			$$invalidate(2, selectedWords[index].points = 1, selectedWords);
    		} else {
    			$$invalidate(6, showCorrectAnswer = true);
    			$$invalidate(7, readOnly = true);
    			return;
    		}

    		$$invalidate(4, answer = "");
    		$$invalidate(3, index++, index);
    		answerInput.focus();
    	};

    	onMount(() => {
    		answerInput.focus();
    	});

    	const writable_props = ["words", "wordsLength"];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<Quiz> was created with unknown prop '${key}'`);
    	});

    	function textinput_value_binding(value) {
    		answer = value;
    		$$invalidate(4, answer);
    	}

    	function textinput_ref_binding(value) {
    		answerInput = value;
    		$$invalidate(1, answerInput);
    	}

    	$$self.$$set = $$props => {
    		if ("words" in $$props) $$invalidate(10, words = $$props.words);
    		if ("wordsLength" in $$props) $$invalidate(0, wordsLength = $$props.wordsLength);
    	};

    	$$self.$capture_state = () => ({
    		Counter,
    		Summary,
    		onMount,
    		shuffleArray,
    		getWordDescription,
    		MainContainer,
    		TextInput,
    		words,
    		wordsLength,
    		answerInput,
    		selectedWords,
    		index,
    		answer,
    		score,
    		showCorrectAnswer,
    		readOnly,
    		retry,
    		submitAnswer
    	});

    	$$self.$inject_state = $$props => {
    		if ("words" in $$props) $$invalidate(10, words = $$props.words);
    		if ("wordsLength" in $$props) $$invalidate(0, wordsLength = $$props.wordsLength);
    		if ("answerInput" in $$props) $$invalidate(1, answerInput = $$props.answerInput);
    		if ("selectedWords" in $$props) $$invalidate(2, selectedWords = $$props.selectedWords);
    		if ("index" in $$props) $$invalidate(3, index = $$props.index);
    		if ("answer" in $$props) $$invalidate(4, answer = $$props.answer);
    		if ("score" in $$props) $$invalidate(5, score = $$props.score);
    		if ("showCorrectAnswer" in $$props) $$invalidate(6, showCorrectAnswer = $$props.showCorrectAnswer);
    		if ("readOnly" in $$props) $$invalidate(7, readOnly = $$props.readOnly);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		wordsLength,
    		answerInput,
    		selectedWords,
    		index,
    		answer,
    		score,
    		showCorrectAnswer,
    		readOnly,
    		retry,
    		submitAnswer,
    		words,
    		textinput_value_binding,
    		textinput_ref_binding
    	];
    }

    class Quiz extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { words: 10, wordsLength: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Quiz",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*words*/ ctx[10] === undefined && !("words" in props)) {
    			console.warn("<Quiz> was created without expected prop 'words'");
    		}
    	}

    	get words() {
    		throw new Error("<Quiz>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set words(value) {
    		throw new Error("<Quiz>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get wordsLength() {
    		throw new Error("<Quiz>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set wordsLength(value) {
    		throw new Error("<Quiz>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    // CZŁOWIEK

    var chapter1 = [
      // DANE OSOBOWE
      {
        pl: "wiek",
        en: "age"
      },
      {
        pl: "miejsce urodzenia",
        en: "place of birth"
      },
      {
        pl: "rozwiedziony",
        en: "divorced"
      },
      {
        pl: "imię",
        en: "first name"
      },
      {
        pl: "płci męskiej",
        en: "male",
      },
      {
        pl: "płci żeńskiej",
        en: "female",
      },
      {
        pl: "stan cywilny",
        en: "marital status",
      },
      {
        pl: "żonaty",
        en: "married",
      },
      {
        pl: "drugie imię",
        en: "middle name",
      },
      {
        pl: "narodowość",
        en: "nationality",
      },
      {
        pl: "zawód",
        en: "occupation",
      },
      {
        pl: "dane osobowe",
        en: "personal data",
      },
      {
        pl: "stanu wolnego",
        en: "single",
      },
      {
        pl: "nazwisko",
        en: "surname",
      },
      {
        pl: "wdowa",
        en: "widow",
      },
      
      // WYGLĄD ZEWNĘTRZNY
      {
        pl: "być podobnym do",
        en: "be similar to",
      },
      {
        pl: "opis",
        en: "description",
      },
      {
        pl: "atrakcyjny",
        en: "good-looking",
      },
      {
        pl: "przystojny",
        en: "handsome",
      },
      {
        pl: "wyglądać jak",
        en: "look like",
      },
      {
        pl: "brzydki",
        en: "ugly",
      },
      {
        pl: "nieatrakcyjny",
        en: "unattractive",
      },

      // WZROST
      {
        pl: "być średniego wzrostu",
        en: "be of medium height",
      },
      {
        pl: "niski",
        en: "short",
      },
      {
        pl: "wysoki",
        en: "tall",
      },

      // BUDOWA CIAŁA
      {
        pl: "mieć nadwagę",
        en: "be overweight",
      },
      {
        pl: "gruby",
        en: "fat",
      },
      {
        pl: "pulchny",
        en: "plump",
      },
      {
        pl: "szczupły",
        en: "slim",
      },
      {
        pl: "przysadzisty",
        en: "stocky",
      },
      {
        pl: "chudy",
        en: "thin",
      },
      {
        pl: "dobrze zbudowany",
        en: "well-built",
      },
      
      // WIEK
      {
        pl: "dorosły",
        en: "adult",
      },
      {
        pl: "w podeszłym wieku",
        en: "elderly",
      },
      {
        pl: "po dwudziestce",
        en: ["in his twenties", "in her twenties"]
      },
      {
        pl: "nastoletnia",
        en: "in her teens",
      },
      {
        pl: "w średnim wieku",
        en: "middle-aged",
      },
      {
        pl: "stary",
        en: "old",
      },
      {
        pl: "młody",
        en: "young",
      },

      // TWARZ
      {
        pl: "broda",
        en: "beard",
      },
      {
        pl: "piegi",
        en: "freckles",
      },
      {
        pl: "pełne usta",
        en: "full lips",
      },
      {
        pl: "wąskie usta",
        en: "thin lips",
      },
      {
        pl: "wysokie czoło",
        en: "high forehead",
      },
      {
        pl: "wąsy",
        en: "moustache",
      },
      {
        pl: "blady",
        en: "pale",
      },
      {
        pl: "pryszcz",
        en: "pimple",
      },
      {
        pl: "blizna",
        en: "scar",
      },
      {
        pl: "zadarty nos",
        en: "snub nose",
      },
      {
        pl: "mocny podbródek",
        en: "strong chin",
      },
      {
        pl: "małe oczy",
        en: ["tiny eyes", "small eyes"],
      },
      {
        pl: "zmarszczki",
        en: "wrinkles",
      },

      // WŁOSY
      {
        pl: "łysy",
        en: "bald",
      },
      {
        pl: "blond włosy",
        en: "blond hair",
      },
      {
        pl: "jasne włosy",
        en: "fair hair",
      },
      {
        pl: "ciemne włosy",
        en: "dark hair",
      },
      {
        pl: "rude włosy",
        en: "red hair",
      },
      {
        pl: "siwe włosy",
        en: "grey hair",
      },
      {
        pl: "kręcone włosy",
        en: "curly hair",
      },
      {
        pl: "farbowane włosy",
        en: "dyed hair",
      },
      {
        pl: "grzywka",
        en: "fringe",
      },
      {
        pl: "kucyk",
        en: "pony tail",
      },
      {
        pl: "sterczące włosy",
        en: "spiky hair",
      },
      {
        pl: "proste włosy",
        en: "straight hair",
      },
      {
        pl: "falujące włosy",
        en: "wavy hair",
      },

      // STYL
      {
        pl: "nieformalny",
        en: "casual",
      },
      {
        pl: "wygodny",
        en: "comfortable",
      },
      {
        pl: "elegancki",
        en: ["elegant", "smart"],
      },
      {
        pl: "modny",
        en: "fashionable",
      },
      {
        pl: ["oficjalny, odświętny (strój)", "oficjalny", "odświętny"],
        en: "formal",
      },
      {
        pl: "luźny",
        en: "loose",
      },
      {
        pl: "niechlujny",
        en: "scruffy",
      },
      {
        pl: "obcisły",
        en: "tight",
      },
      
      // CZĘŚCI GARDEROBY
      {
        pl: "bluzka",
        en: "blouse",
      },
      {
        pl: "bokserki",
        en: "boxer shorts",
      },
      {
        pl: "płaszcz",
        en: "coat",
      },
      {
        pl: "sukienka",
        en: "dress",
      },
      {
        pl: "bluza z kapturem",
        en: "hoody",
      },
      {
        pl: "polar",
        en: "fleece",
      },
      {
        pl: "kurtka",
        en: "jacket",
      },
      {
        pl: "sweter",
        en: ["jumper", "sweater"]
      },
      {
        pl: "para jeansów",
        en: "pair of jeans",
      },
      {
        pl: "płaszcz przeciwdeszczowy",
        en: "raincoat",
      },
      {
        pl: "koszula",
        en: "shirt",
      },
      {
        pl: "krótkie spodenki",
        en: "shorts",
      },
      {
        pl: "spódnica",
        en: "skirt",
      },
      {
        pl: "skarpetki",
        en: "socks",
      },
      {
        pl: "garnitur",
        en: "suit",
      },
      {
        pl: "bluza",
        en: "sweatshirt",
      },
      {
        pl: "krawat",
        en: "tie",
      },
      {
        pl: "rajstopy",
        en: "tights",
      },
      {
        pl: "dres",
        en: "tracksuit",
      },
      {
        pl: "spodnie",
        en: ["trousers", "pants"],
      },
      {
        pl: "bielizna",
        en: "underwear",
      },

      // BUTY
      {
        pl: "buty z cholewką",
        en: "boots",
      },
      {
        pl: "buty na wysokim obcasie",
        en: "high heels",
      },
      {
        pl: "buty",
        en: "shoes",
      },
      {
        pl: "kapcie",
        en: "slippers",
      },
      {
        pl: "obuwie sportowe",
        en: ["trainers", "sport shoes"]
      },
      {
        pl: "kalosze",
        en: "wellingtons",
      },

      // DODATKI
      {
        pl: "pasek",
        en: "belt",
      },
      {
        pl: "bransoletka",
        en: "bracelet",
      },
      {
        pl: "czapka z daszkiem",
        en: "cap",
      },
      {
        pl: "kolczyki",
        en: "earrings",
      },
      {
        pl: "rękawiczki",
        en: "gloves",
      },
      {
        pl: "kapelusz",
        en: "hat",
      },
      {
        pl: "biżuteria",
        en: "jewellery",
      },
      {
        pl: "naszyjnik",
        en: "necklace",
      },
      {
        pl: "szalik",
        en: "scarf",
      },
      {
        pl: "parasolka",
        en: "umbrella",
      },

      // CZĘŚCI UBRAŃ
      {
        pl: "guzik",
        en: "button",
      },
      {
        pl: "kieszeń",
        en: "pocket",
      },
      {
        pl: "rękaw",
        en: "sleeve",
      },
      {
        pl: "zamek błyskawiczny",
        en: "zip",
      },
      
      // MATERIAŁY
      {
        pl: "bawełniany",
        en: "cotton",
      },
      {
        pl: "skórzany",
        en: "leather",
      },
      {
        pl: "gładki",
        en: "plain",
      },
      {
        pl: "jedwabny",
        en: "silk",
      },
      {
        pl: "wełniany",
        en: "woolen",
      },

      // CZASOWNIKI
      {
        pl: ["ubierać się, nosić (ubrania)", "ubiera się", "nosić"],
        en: "dress",
      },
      {
        pl: ["pasować (rozmiarem)", "pasować"],
        en: "fit",
      },
      {
        pl: "ubrać się",
        en: "get dressed",
      },
      {
        pl: "pasować do czegoś",
        en: ["go with something", "go with sth"],
      },
      {
        pl: "wyglądać dobrze",
        en: "look good",
      },
      {
        pl: "pasować do czegoś",
        en: "match",
      },
      {
        pl: "założyć",
        en: "put on",
      },
      {
        pl: ["pasować (kolorem lub fasonem)", "pasować"],
        en: "suit",
      },
      {
        pl: "zdjąć",
        en: "take off",
      },
      {
        pl: "przymierzyć",
        en: "try on",
      },
      {
        pl: ["nosić (ubrania)", "nosić"],
        en: "wear",
      },

      // CECHY CHARAKTERU
      {
        pl: "ambitny",
        en: "ambitious",
      },
      {
        pl: "nudny",
        en: "boring",
      },
      {
        pl: "odważny",
        en: "brave",
      },
      {
        pl: "spokojny",
        en: "calm",
      },
      {
        pl: "bystry",
        en: "clever",
      },
      {
        pl: "pewny siebie",
        en: "confident",
      },
      {
        pl: "kreatywny",
        en: "creative",
      },
      {
        pl: "zdecydowany",
        en: "decisive",
      },
      {
        pl: "nieuczciwy",
        en: "dishonest",
      },
      {
        pl: "nielojalny",
        en: "disloyal",
      },
      {
        pl: "szczodry",
        en: "generous",
      },
      {
        pl: "pracowity",
        en: "hard-working",
      },
      {
        pl: "uczciwy",
        en: "honest",
      },
      {
        pl: "nieuprzejmy",
        en: "impolite",
      },
      {
        pl: "niecierpliwy",
        en: "impatient",
      },
      {
        pl: "inspirujący",
        en: "inspiring",
      },
      {
        pl: "nieodpowiedzialny",
        en: "irresponsible",
      },
      {
        pl: "leniwy",
        en: "lazy",
      },
      {
        pl: ["złośliwy, skąpy", "złośliwy", "skąpy"],
        en: "mean",
      },
      {
        pl: "skromny",
        en: "modest",
      },
      {
        pl: "praktyczny",
        en: "practical",
      },
      {
        pl: "cichy",
        en: "quiet",
      },
      {
        pl: "samolubny",
        en: "selfish",
      },
      {
        pl: "towarzyski",
        en: "sociable",
      },
      {
        pl: "uparty",
        en: "stubborn",
      },
      {
        pl: "rozmowny",
        en: "talkative",
      },
      {
        pl: "nieschludny",
        en: "untidy",
      },
      {
        pl: "niesprawiedliwy",
        en: "unfair",
      },
      {
        pl: "niemiły",
        en: "unfriendly",
      },
      {
        pl: "nieżyczliwy",
        en: "unkind",
      },

      // UCZUCIA I EMOCJE
      {
        pl: "zdumiony",
        en: "amazed",
      },
      {
        pl: "rozbawiony",
        en: "amused",
      },
      {
        pl: "rozgniewany",
        en: "angry",
      },
      {
        pl: "rozdrażniony",
        en: "annoyed",
      },
      {
        pl: "znudzony",
        en: "bored",
      },
      {
        pl: ["zdezorientowany, zagubiony", "zdezorientowany", "zagubiony"],
        en: "confused",
      },
      {
        pl: "przygnębiony",
        en: "depressed",
      },
      {
        pl: "rozczarowany",
        en: "disappointed",
      },
      {
        pl: "zawstydzony",
        en: "embarrassed",
      },
      {
        pl: "podekscytowany",
        en: "excited",
      },
      {
        pl: "wyczerpany",
        en: "exhausted",
      },
      {
        pl: "przestraszony",
        en: "frightened",
      },
      {
        pl: ["pełen nadziei, ufny", "pełen nadziei", "ufny"],
        en: "hopeful",
      },
      {
        pl: "zazdrosny",
        en: "jealous",
      },
      {
        pl: "samotny",
        en: "lonely",
      },
      {
        pl: "zadowolony",
        en: "pleased",
      },
      {
        pl: "dumny",
        en: "proud",
      },
      {
        pl: "zestresowany",
        en: "stressed",
      },
      {
        pl: "zdziwiony",
        en: "surprised",
      },
      {
        pl: "zmęczony",
        en: "tired",
      },

      // CZASOWNIKI ZŁOŻONE I ZWROTY
      {
        pl: "bać się czegoś",
        en: ["be afraid of something", "be afraid of sth"],
      },
      {
        pl: "być złym na kogoś",
        en: ["be angry with somebody", "be angry with sb"],
      },
      {
        pl: "śmiertelnie się nudzić",
        en: "be bored to death",
      },
      {
        pl: "lubić coś",
        en: ["be fond of something", "be fond of sth"],
      },
      {
        pl: "być dobrym w czymś",
        en: ["be good at something", "be good at sth"],
      },
      {
        pl: "interesować się czymś",
        en: ["be keen on something", "be keen on sth"],
      },
      {
        pl: "być do niczego w czymś",
        en: ["be useless at something", "be useless at sth"],
      },
      {
        pl: "martwić się czymś",
        en: ["be worried about something", "be worried about sth"],
      },
      {
        pl: "należeć do",
        en: "belong to",
      },
      {
        pl: "obgryzać paznokcie",
        en: ["bite nails", "bite your nails"],
      },
      {
        pl: "mrugać oczami",
        en: ["blink eyes", "blink your eyes"],
      },
      {
        pl: "zmieniać zdanie",
        en: ["change your mind", "change mind"],
      },
      {
        pl: "skrzyżować ramiona",
        en: ["cross arms", "cross your arms"],
      },
      {
        pl: "przebrać się za coś",
        en: "dress up as something",
      },
      {
        pl: "ulubiona rozrywka",
        en: "favourite pastime",
      },
      {
        pl: "wypełnić formularz",
        en: "fill in a form",
      },
      {
        pl: "piłka nożna",
        en: ["footie", "football"],
      },
      {
        pl: "koncert",
        en: "gig",
      },
      {
        pl: "ukrywać uczucia",
        en: ["hide feelings", "hide your feelings"],
      },
      {
        pl: "nie okazywać uczuć",
        en: ["keep feelings inside", "keep your feelings inside"],
      },
      {
        pl: "zdrowie psychiczne",
        en: "mental health",
      },
      {
        pl: "kazać komuś coś zrobić",
        en: ["order somebody to do something", "order sb to do sth"],
      },
      {
        pl: "to bułka z masłem",
        en: ["it's a piece of cake", "it is a piece of cake", "piece of cake"],
      },
      {
        pl: "wprawiać kogoś w dobry nastrój",
        en: ["put somebody in a good mood", "put sb in a good mood"],
      },
      {
        pl: "poczucie humoru",
        en: "sense of humour",
      },
      {
        pl: "bezdomne zwierzę",
        en: "stray animal",
      },
      {
        pl: "pukać palcami",
        en: ["tap fingers", "tap your fingers"],
      },
    	];

    // MIEJSCE ZAMIESZKANIA

    var chapter2 = [
      // części domu
      {
        pl: "strych",
        en: "attic"
      },
      {
        pl: "piwnica",
        en: "basement",
      },
      {
        pl: "łazienka",
        en: "bathroom",
      },
      {
        pl: "sypialnia",
        en: "bedroom",
      },
      {
        pl: "sufit",
        en: "ceiling",
      },
      {
        pl: "komin",
        en: "chimney",
      },
      {
        pl: "jadalnia",
        en: "dining room",
      },
      {
        pl: "na dole domu",
        en: "downstairs",
      },
      {
        pl: "podjazd",
        en: "driveway",
      },
      {
        pl: ["ogrodzenie", "płot"],
        en: "fence",
      },
      {
        pl: "podłoga",
        en: "floor",
      },
      {
        pl: "garaż",
        en: "garage",
      },
      {
        pl: "parter",
        en: "ground floor",
      },
      {
        pl: "przedpokój",
        en: "hall",
      },
      {
        pl: "domofon",
        en: "intercom",
      },
      {
        pl: "kuchnia",
        en: "kitchen",
      },
      {
        pl: "trawnik",
        en: "lawn",
      },
      {
        pl: "winda",
        en: "lift",
      },
      {
        pl: "salon",
        en: "living room",
      },
      {
        pl: "dach",
        en: "roof",
      },
      {
        pl: "schody",
        en: "stairs",
      },
      {
        pl: "gabinet",
        en: "study",
      },
      {
        pl: "taras",
        en: "terrace",
      },
      {
        pl: "toaleta",
        en: "toilet",
      },
      {
        pl: "na górze domu",
        en: "upstairs",
      },
      {
        pl: "ściana",
        en: "wall",
      },
      // meble i wyposażenie
      {
        pl: "klimatyzacja",
        en: "air conditioning",
      },
      {
        pl: "żaluzje",
        en: "blinds",
      },
      {
        pl: "półka na książki",
        en: "bookshelf",
      },
      {
        pl: "dywan",
        en: "carpet",
      },
      {
        pl: "centralne ogrzewanie",
        en: "central heating",
      },
      {
        pl: "zasłony",
        en: "curtains",
      },
      {
        pl: "szuflada",
        en: "drawer",
      },
      {
        pl: "wykładzina dywanowa",
        en: "fitted carpet",
      },
      {
        pl: "meble",
        en: "furniture",
      },
      {
        pl: "obraz",
        en: "painting",
      },
      {
        pl: "plakat",
        en: "poster",
      },
      {
        pl: "kaloryfer",
        en: "radiator",
      },
      {
        pl: "tapeta",
        en: "wallpaper",
      },
      {
        pl: "parapet",
        en: "windowsill",
      },
      // pokój dzienny
      {
        pl: "fotel",
        en: "armchair",
      },
      {
        pl: "biblioteczka",
        en: "bookcase",
      },
      {
        pl: "stolik kawowy",
        en: "coffee table",
      },
      {
        pl: "poduszka ozdobna",
        en: "cushion",
      },
      {
        pl: "kominek",
        en: "fireplace",
      },
      {
        pl: "roślina",
        en: "plant",
      },
      {
        pl: "kanapa",
        en: "sofa",
      },
      // kuchnia
      {
        pl: "kuchenka",
        en: "cooker",
      },
      {
        pl: ["szafka", "kredens"],
        en: "cupboard",
      },
      {
        pl: "zmywarka",
        en: "dishwasher",
      },
      {
        pl: "lodówka",
        en: "fridge",
      },
      {
        pl: "patelnia",
        en: "frying pan",
      },
      {
        pl: "czajnik",
        en: "kettle",
      },
      {
        pl: "kubek",
        en: ["mug", "cup"],
      },
      {
        pl: "piekarnik",
        en: "oven",
      },
      {
        pl: ["rondel", "patelnia"],
        en: "pan",
      },
      {
        pl: "talerz",
        en: "plate",
      },
      {
        pl: "garnek",
        en: "pot",
      },
      {
        pl: "zlew",
        en: "sink",
      },
      {
        pl: "kosz na śmieci",
        en: ["wastebin", "rubbish bin"]
      },
      //sypialnia
      {
        pl: "budzik",
        en: "alarm clock",
      },
      {
        pl: "stolik nocny",
        en: "bedside table",
      },
      {
        pl: "koc",
        en: "blanket",
      },
      {
        pl: "komoda",
        en: "chest of drawers",
      },
      {
        pl: "wieszak",
        en: "coat hanger",
      },
      {
        pl: "biurko",
        en: "desk",
      },
      {
        pl: "kołdra",
        en: "duvet",
      },
      {
        pl: "poduszka",
        en: "pillow",
      },
      {
        pl: ["chodnik", "dywanik"],
        en: "rug",
      },
      {
        pl: "szafa",
        en: "wardrobe",
      },
      //łazienka i toaleta
      {
        pl: "wanna",
        en: "bath",
      },
      {
        pl: "suszarka",
        en: "hairdryer",
      },
      {
        pl: "lustro",
        en: "mirror",
      },
      {
        pl: "prysznic",
        en: "shower",
      },
      {
        pl: ["kran", "kurek"],
        en: "tap",
      },
      {
        pl: "sedes",
        en: "toilet",
      },
      {
        pl: "ręcznik",
        en: "towel",
      },
      {
        pl: "umywalka",
        en: "washbasin",
      },
      {
        pl: "pralka",
        en: "washing machine",
      },
      //przymiotniki
      {
        pl: "czysty",
        en: "clean",
      },
      {
        pl: "wygodny",
        en: "comfortable",
      },
      {
        pl: "przytulny",
        en: "cosy",
      },
      {
        pl: ["ozdobiony", "pomalowany"],
        en: "decorated",
      },
      {
        pl: "pusty",
        en: "empty",
      },
      {
        pl: ["zabawnie", "śmiesznie wyglądający"],
        en: ["funny-looking", "funny looking"]
      },
      {
        pl: "umeblowany",
        en: "furnished",
      },
      {
        pl: ["olbrzymi", "wielki"],
        en: "huge",
      },
      {
        pl: "jasny",
        en: "light",
      },
      {
        pl: "luksusowy",
        en: "luxurious",
      },
      {
        pl: ["nieuporządkowany", "zabałaganiony"],
        en: ["messy", "untidy"]
      },
      {
        pl: "staromodny",
        en: ["old-fashioned", "old fashioned"]
      },
      {
        pl: "nowoczesny",
        en: "modern",
      },
      {
        pl: "przyjemny",
        en: "pleasant",
      },
      {
        pl: ["niechlujny", "brudny"],
        en: "scruffy",
      },
      {
        pl: "elegancki",
        en: "smart",
      },
      {
        pl: "przestronny",
        en: "spacious",
      },
      {
        pl: "kamienny",
        en: "stone",
      },
      {
        pl: "słoneczny",
        en: "sunny",
      },
      {
        pl: ["schludny", "posprzątany"],
        en: "tidy",
      },
      {
        pl: "maleńki",
        en: "tiny",
      },
      {
        pl: "niezwykły",
        en: "unusual",
      },
      {
        pl: "dobrze wyposażony",
        en: ["well-equipped", "well equipped"]
      },
      {
        pl: "drewniany",
        en: "wooden",
      },
      {
        pl: ["dogodny", "wygodny"],
        en: "convenient",
      },
      {
        pl: "zatłoczony",
        en: "crowded",
      },
      {
        pl: "niebezpieczny",
        en: "dangerous",
      },
      {
        pl: "tętniący życiem",
        en: "lively",
      },
      {
        pl: "hałaśliwy",
        en: "noisy",
      },
      {
        pl: "spokojny",
        en: "peaceful",
      },
      {
        pl: "malowniczy",
        en: "picturesque",
      },
      {
        pl: "zanieczyszczony",
        en: "polluted",
      },
      {
        pl: "cichy",
        en: "quiet",
      },
      {
        pl: "bezpieczny",
        en: "safe",
      },
      // przyimki
      {
        pl: "nad",
        en: "above",
      },
      {
        pl: "z tyłu",
        en: "at the back",
      },
      {
        pl: "z przodu",
        en: "at the front",
      },
      {
        pl: "pomiędzy",
        en: "between",
      },
      {
        pl: "przed",
        en: "in front of",
      },
      {
        pl: "w rogu",
        en: "in the corner",
      },
      {
        pl: "pośrodku",
        en: "in the middle",
      },
      {
        pl: "wewnątrz",
        en: "inside",
      },
      {
        pl: "blisko",
        en: "near",
      },
      {
        pl: "obok",
        en: "next to",
      },
      {
        pl: "po prawej stronie",
        en: "on the right",
      },
      {
        pl: "po lewej stronie",
        en: "on the left",
      },
      {
        pl: "na prawo od",
        en: "to the right of",
      },
      {
        pl: "na lewo od",
        en: "to the left of",
      },
      {
        pl: "naprzeciwko",
        en: "opposite",
      },
      {
        pl: "na zewnątrz",
        en: "outside",
      },
      {
        pl: "pod",
        en: "under",
      },

      // Rodzaje domów
      {
        pl: "mieszkanie",
        en: "flat",
      },
      {
        pl: "blok mieszkalny",
        en: "block of flats",
      },
      {
        pl: "domek na wsi",
        en: "cottage",
      },
      {
        pl: "dom jednorodzinny",
        en: "detached house",
      },
      {
        pl: ["akademik", "internat", "bursa"],
        en: "hall of residence",
      },
      {
        pl: "domek letniskowy",
        en: "holiday home",
      },
      {
        pl: "drapacz chmur",
        en: "skyscraper",
      },
      {
        pl: ["zabytkowa rezydencja", "dwór"],
        en: "stately home",
      },
      {
        pl: "dom szeregowy",
        en: "terraced house",
      },
      {
        pl: "rezydencja miejska",
        en: "town house",
      },

      // POŁOŻENIE
      {
        pl: ["teren", "okolica"],
        en: "area",
      },
      {
        pl: "nad jeziorem",
        en: "by the lake",
      },
      {
        pl: "blisko czegoś",
        en: "close to something",
      },
      {
        pl: "daleko od czegoś",
        en: "far from something",
      },
      {
        pl: "w hałaśliwej dzielnicy",
        en: "in a noisy district",
      },
      {
        pl: "w cichej okolicy",
        en: "in a quiet neighbourhood",
      },
      {
        pl: "w stolicy",
        en: "in the capital city",
      },
      {
        pl: "na wsi",
        en: "in the country",
      },
      {
        pl: "w centrum",
        en: "in the heart of",
      },
      {
        pl: "na głównej ulicy",
        en: "in the main street",
      },
      {
        pl: "w górach",
        en: "in the mountains",
      },
      {
        pl: "na przedmieściu",
        en: "in the suburbs",
      },
      {
        pl: "w centrum małego miasta",
        en: "in the town center",
      },
      {
        pl: "umieszczony",
        en: "located",
      },
      {
        pl: "nieopodal",
        en: "nearby",
      },
      {
        pl: "na plaży",
        en: "on the beach",
      },
      {
        pl: "na granicy",
        en: "on the border",
      },
      {
        pl: "z widokiem na rzekę",
        en: "overlooking the river",
      },
      {
        pl: ["wieś", "wioska"],
        en: "village",
      },

      // Życie na wsi i w mieście
      {
        pl: "być blisko natury",
        en: "be close to nature",
      },
      {
        pl: "ruchliwe ulice",
        en: "busy streets",
      },
      {
        pl: "kawiarnia",
        en: "cafe",
      },
      {
        pl: "parking",
        en: "car park",
      },
      {
        pl: "kościół",
        en: "church",
      },
      {
        pl: "czyste powietrze",
        en: "clean air",
      },
      {
        pl: "chodnik",
        en: ["pavement", "sidewalk"],
      },
      {
        pl: "komunikacja publiczna",
        en: "public transport",
      },
      {
        pl: "centrum handlowe",
        en: "shopping centre",
      },
      {
        pl: "centrum sportu",
        en: "sports centre",
      },
      {
        pl: "korek uliczny",
        en: "traffic jam",
      },
      {
        pl: "w zasięgu dojazdu do pracy",
        en: "within commuting distance",
      },

      // Zwroty
      {
        pl: "oprócz",
        en: "apart from",
      },
      {
        pl: "należeć do",
        en: "belong to",
      },
      {
        pl: "składać się z",
        en: "consist of",
      },
      {
        pl: "urządzić pokój",
        en: "decorate a room",
      },
      {
        pl: "odnowić",
        en: ["do renovate", "renovate", "do up"],
      },
      {
        pl: "agencja nieruchomości",
        en: "estate agency",
      },
      {
        pl: "drogi w utrzymaniu",
        en: "expensive to maintain",
      },
      {
        pl: "mieszkać samemu",
        en: "live on your own",
      },
      {
        pl: "zrobić miejsce",
        en: ["make some space", "make space"],
      },
      {
        pl: "rozgościć się",
        en: "make yourself at home",
      },
      {
        pl: "przeprowadzić się",
        en: "move house",
      },
      {
        pl: "płacić czynsz",
        en: "pay the rent",
      },
      {
        pl: "cisza i spokój",
        en: "peace and quiet",
      },
      {
        pl: "wynajmować mieszkanie",
        en: "rent a flat",
      },
      {
        pl: "dzielić z kimś pokój",
        en: "share a room with somebody",
      },

      // Czasowniki złożone
      {
        pl: "włamać się do",
        en: "break into",
      },
      {
        pl: "uciec od czegoś",
        en: "get away from",
      },
      {
        pl: "poddać się",
        en: "give up",
      },
      {
        pl: "wprowadzić się",
        en: "move in",
      },
      {
        pl: "wyprowadzić się",
        en: "move out",
      },
      {
        pl: "podłączyć do prądu",
        en: "plug in",
      },
      {
        pl: "wyłączyć z prądu",
        en: "plug off",
      },
      {
        pl: "włączyć",
        en: ["switch on", "turn on"],
      },
      {
        pl: "wyłączyć",
        en: ["switch off", "turn off"],
      },
      {
        pl: "posprzątać",
        en: "tidy up",
      },
      {
        pl: "wyrzucić coś",
        en: "throw something away",
      },
      {
        pl: "ściszyć",
        en: "turn down",
      },
      {
        pl: "podgłośnić",
        en: "turn up",
      },

      // Inne
      {
        pl: "ulubione miejsce do spędzania wolnego czasu",
        en: "hangout",
      },
      {
        pl: "zamieszkany",
        en: "inhabited",
      },
      {
        pl: "zastanawiać się",
        en: "wonder",
      }
    ];

    // ŹYCIE PRYWATNE

    var chapter3 = [
      // rodzina
      {
        pl: "adoptowany",
        en: "adopted"
      },
      {
        pl: "ciocia",
        en:"aunt"
      },
      {
        pl: "szwagier",
        en: ["brother-in-law", "brother in law"]
      },
      {
        pl: "kuzyn",
        en: "cousin"
      },
      {
        pl: "teść",
        en: ["father-in-law", "father in law"]
      },
      {
        pl: "wnuki",
        en: "grandchildren"
      },
      {
        pl: "wnuczka",
        en: "granddaughter"
      },
      {
        pl: "dziadek",
        en: "grandfather"
      },
      {
        pl: "babcia",
        en: "grandmother"
      },
      {
        pl: "dziadkowie",
        en: "grandparents"
      },
      {
        pl: "wnuk",
        en: "grandson"
      },
      {
        pl: "prawnuki",
        en: ["great-grandchildren", "great grandchildren"]
      },
      {
        pl: "pradziadkowie",
        en: ["great-grandparents", "great grandparents"]
      },
      {
        pl: "brat przyrodni",
        en: ["half-brother", "half brother"]
      },
      {
        pl: "siostra przyrodnia",
        en: ["half-sister", "half sister"]
      },
      {
        pl: "mąż",
        en: "husband"
      },
      {
        pl: "teściowa",
        en: ["mother-in-law", "mother in law"]
      },
      {
        pl: "siostrzeniec, bratanek",
        en: "nephew"
      },
      {
        pl: "siostrzenica, bratanica",
        en: "niece"
      },
      {
        pl: "jedynak/jedynaczka",
        en: "only child"
      },
      {
        pl: "rodzice",
        en: "parents"
      },
      {
        pl: "krewny",
        en: "relative"
      },
      {
        pl: "rodzeństwo",
        en: "sibling"
      },
      {
        pl: "szwagierka, bratowa",
        en: ["sister-in-law", "sister in law"]
      },
      {
        pl: "ojczym",
        en: "stepfather"
      },
      {
        pl: "macocha",
        en: "stepmother"
      },
      {
        pl: "bliźnięta",
        en: "twins"
      },
      {
        pl: "wujek",
        en: "uncle"
      },
      {
        pl: "żona",
        en: "wife"
      },
      // etapy życia
      {
        pl: "dorosły",
        en: "adult"
      },
      {
        pl: "w wieku",
        en: "at the age of"
      },
      {
        pl: "urodzić się",
        en: "be born"
      },
      {
        pl: "narodziny",
        en: "birth"
      },
      {
        pl: "dzieciństwo",
        en: "childhood"
      },
      {
        pl: "śmierć",
        en: "death"
      },
      {
        pl: "umrzeć",
        en: "die"
      },
      {
        pl: "w podeszłym wieku",
        en: "elderly"
      },
      {
        pl: "dorastać",
        en: "grow up"
      },
      {
        pl: "nastolatek/nastolatka",
        en: "teenager"
      },
      //czynności codzienne
      {
        pl: "sprzątać pokój",
        en: "clean your room"
      },
      {
        pl: "odrabiać lekcje",
        en: "do homework"
      },
      {
        pl: "sprzątać",
        en: "do the cleaning"
      },
      {
        pl: "wykonywać prace domowe",
        en: "do the housework"
      },
      {
        pl: "robić zakupy",
        en: ["do the shopping", "go shopping"]
      },
      {
        pl: "odkurzać",
        en: "do the vacuuming"
      },
      {
        pl: "robić pranie",
        en: ["do the washing", "wash your clothes"]
      },
      {
        pl: "zmywać naczynia",
        en: ["do the washing-up", "wash the dishes"]
      },
      {
        pl: "ubierać się ",
        en: "get dressed"
      },
      {
        pl: "szykować się do szkoły",
        en: "get ready for school"
      },
      {
        pl: "jechać do szkoły samochodem",
        en: "go to school by car"
      },
      {
        pl: "jeść śniadanie",
        en: "have breakfast"
      },
      {
        pl: "brać prysznic",
        en: "take a shower"
      },
      {
        pl: "nakrywać do stołu",
        en: "lay the table"
      },
      {
        pl: "ładować zmywarkę",
        en: "load the dishwasher"
      },
      {
        pl: "opiekować się kimś",
        en: "look after somebody"
      },
      {
        pl: "ścielić łóżko",
        en: "make your bed"
      },
      {
        pl: "opiekować się zwierzętami domowymi",
        en: "take care of pets"
      },
      {
        pl: "wyrzucać śmieci",
        en: "take out the rubbish "
      },
      {
        pl: "porządkować biurko",
        en: "tidy your desk"
      },
      {
        pl: "budzić się",
        en: "wake up"
      },
      {
        pl: "wyprowadzać psa",
        en: "walk the dog"
      },
      {
        pl: "myć samochód",
        en: "wash the car"
      },
      // czas wolny
      {
        pl: "planować życie towarzyskie",
        en: "arrange social life"
      },
      {
        pl: "interesować się czymś",
        en: "be interested in something"
      },
      {
        pl: "lubić coś",
        en: "be keen on something"
      },
      {
        pl: "robić coś",
        en: "be up to something"
      },
      {
        pl: "czatować na facebooku",
        en: "chat on facebook"
      },
      {
        pl: "uprawiać sport",
        en: "do sport"
      },
      {
        pl: "pracować społecznie jako wolontariusz",
        en: "do voluntary work"
      },
      {
        pl: "dobrze się bawić",
        en: "have fun"
      },
      {
        pl: "rozrywka",
        en: "entertainment"
      },
      {
        pl: "iść na spacer",
        en: "go for a walk"
      },
      {
        pl: "wychodzić",
        en: "go out"
      },
      {
        pl: "pójść potańczyć",
        en: "go dancing"
      },
      {
        pl: "spędzać czas w internecie",
        en: "spend time online"
      },
      {
        pl: "iść do kina",
        en: "go to the cinema"
      },
      {
        pl: "spędzać z kimś czas",
        en: "hang out with somebody"
      },
      {
        pl: "być w kontakcie",
        en: "keep in touch"
      },
      {
        pl: "grać w szachy",
        en: "play chess"
      },
      {
        pl: "udostępniać zdjęcie",
        en: "share a photo"
      },
      {
        pl: "grać w gry planszowe",
        en: "play board games"
      },
      {
        pl: "rozmawiać na skypie",
        en: "skype"
      },
      {
        pl: "serwis społecznościowy",
        en: "social networking site"
      },
      {
        pl: "spędzać czas z",
        en: "socialise with"
      },
      {
        pl: "spędzać czas na powietrzu",
        en: "spend time outdoors"
      },
      // MAŁŻEŃSTWO I ZWIĄZKI
      {
        pl: "zaprosić kogoś na randkę",
        en: "ask somebody out"
      },
      {
        pl: "wychowywać",
        en: "bring up"
      },
      {
        pl: "panna młoda",
        en: "bride"
      },
      {
        pl: "pocieszyć kogoś",
        en: "cheer somebody up"
      },
      {
        pl: "randka",
        en: "date"
      },
      {
        pl: "pierścionek zaręczynowy",
        en: "engagement ring"
      },
      {
        pl: "zakochać się",
        en: "fall in love"
      },
      {
        pl: "narzeczony",
        en: "fiance"
      },
      {
        pl: "konflikt pokoleń",
        en: "generation gap"
      },
      {
        pl: "zaręczyć się",
        en: "get engaged"
      },
      {
        pl: "poślubić kogoś",
        en: ["get married", "marry somebody"]
      },
      {
        pl: "być w dobrych relacjach z kimś",
        en: "get on well with somebody"
      },
      {
        pl: "poznawać kogoś",
        en: "get to know somebody"
      },
      {
        pl: "chodzić z kimś",
        en: "get out with somebody"
      },
      {
        pl: "pan młody",
        en: "groom"
      },
      {
        pl: "miesiąc miodowy",
        en: "honeymoon"
      },
      {
        pl: "przedstawić się",
        en: "introduce yourself"
      },
      {
        pl: "być z kimś w kontakcie",
        en: "keep in touch with somebody"
      },
      {
        pl: "małżeństwo",
        en: "marriage"
      },
      {
        pl: "para małżeńska",
        en: "married couple"
      },
      {
        pl: "poznać kogoś",
        en: "meet somebody"
      },
      {
        pl: "w ciąży",
        en: "pregnant"
      },
      {
        pl: "oświadczyć się komuś",
        en: "propose to somebody"
      },
      {
        pl: "związek",
        en: "relationship"
      },
      {
        pl: "samotny rodzic",
        en: "single parent"
      },
      {
        pl: "obrączka",
        en: "wedding ring"
      },
      // KONFLIKTY I PROBLEMY
      {
        pl: "zgadzać się z",
        en: "agree with"
      },
      {
        pl: "przepraszać kogoś",
        en: "apologize to somebody"
      },
      {
        pl: "kłócić się z",
        en: "argue with"
      },
      {
        pl: "prosić o pieniądze",
        en: "ask for money"
      },
      {
        pl: "pożyczać od",
        en: "borrow from"
      },
      {
        pl: "zerwać z",
        en: "break up with"
      },
      {
        pl: "skarżyć się na",
        en: "complain about"
      },
      {
        pl: "krytykować czyjeś zachowanie",
        en: "criticize somebody's behaviour"
      },
      {
        pl: "pokłócić się",
        en: ["fall out with", "have a fight"]
      },
      {
        pl: "wpaść w depresję",
        en: "get depressed"
      },
      {
        pl: "rozwieść się",
        en: "get divorced"
      },
      {
        pl: "działać komuś na nerwy",
        en: "get on somebody's nerves"
      },
      {
        pl: "pożyczać komuś pieniądze",
        en: "lend money to somebody"
      },
      {
        pl: "pogodzić się z",
        en: "make up with"
      },
      {
        pl: "uciec",
        en: "run away"
      },
      {
        pl: "rozstać się",
        en: ["separate", "split up with"]
      },
      // Święta i uroczystości
      {
        pl: "Wszystkich Świętych",
        en: "All Saints' Day"
      },
      {
        pl: "świętować",
        en: "celebrate"
      },
      {
        pl: "świętowanie",
        en: "celebration"
      },
      {
        pl: "cmentarz",
        en: ["graveyard", "cemetery"]
      },
      {
        pl: "dzień dziecka",
        en: "children's day"
      },
      {
        pl: "Święta Bożego Narodzenia",
        en: "Christmas"
      },
      {
        pl: "kartka wielkanocna",
        en: "Easter card"
      },
      {
        pl: "pierwszy dzień Świąt Bożego Narodzenia",
        en: "Christmas day"
      },
      {
        pl: "wigilia",
        en: "Christmas Eve"
      },
      {
        pl: "ubierać choinkę",
        en: "decorate the christmas tree"
      },
      {
        pl: "Wielkanoc",
        en: "Easter"
      },
      {
        pl: "króliczek wielkanocny",
        en: "easter bunny"
      },
      {
        pl: "składać sobie życzenia",
        en: "exchange wishes"
      },
      {
        pl: "święto",
        en: ["holiday", "festival"]
      },
      {
        pl: "pokaz fajerwerków",
        en: "fireworks display"
      },
      {
        pl: "pogrzeb",
        en: "funeral"
      },
      {
        pl: "gość",
        en: "guest"
      },
      {
        pl: "zaproszenie",
        en: "invitation"
      },
      {
        pl: "zaprosić",
        en: "invite"
      },
      {
        pl: "Dzień Matki",
        en: "Mother's Day"
      },
      {
        pl: "imieniny",
        en: "name day"
      },
      {
        pl: "nowy rok",
        en: "new year"
      },
      {
        pl: "sylwester",
        en: "new years eve"
      },
      {
        pl: "dzielić się opłatkiem",
        en: "share christmas wafers"
      },
      {
        pl: "odwiedzić groby",
        en: "visit graves"
      },
      {
        pl: "ślub",
        en: "wedding"
      },
      {
        pl: "rocznica ślubu",
        en: "wedding anniversary"
      },
      {
        pl: "przyjęcie weselne",
        en: "wedding reception"
      },
      // inne
      {
        pl: "wymienić",
        en: "exchange"
      },
      {
        pl: "dowiedzieć się",
        en: "find out"
      },
      {
        pl: "śledzić",
        en: "follow"
      },
      {
        pl: "odżywianie",
        en: "nutrition"
      },
      {
        pl: "ssać kciuk",
        en: "suck a thumb"
      },
      {
        pl: "chować",
        en: "tuck"
      },
    ];

    // EDUKACJA

    var chapter4 = [
      // Przedmioty szkolne
      {
        pl: "plastyka",
        en: "Art"
      },
      {
        pl: "języki obce",
        en: "foreign languages"
      },
      {
        pl: "geografia",
        en: "Geography"
      },
      {
        pl: "historia",
        en: "History"
      },
      {
        pl: "informatyka",
        en: ["Information Technology", "IT"]
      },
      {
        pl: "literatura",
        en: "Literature"
      },
      {
        pl: "matematyka",
        en: ["Mathematics", "Maths"]
      },
      {
        pl: "muzyka",
        en: "Music"
      },
      {
        pl: "wychowanie fizyczne",
        en: ["Physical Education", "PE"]
      },
      {
        pl: "religia",
        en: ["Religious Education", "RE"]
      },
      {
        pl: "nauki ścisłe",
        en: "Science"
      },
      {
        pl: "biologia",
        en: "Biology"
      },
      {
        pl: "chemia",
        en: "Chemistry"
      },
      {
        pl: "fizyka",
        en: "Physics"
      },
      {
        pl: "przedmiot szkolny",
        en: "subject"
      },
      // Typy szkół
      {
        pl: "przedszkole",
        en: ["nursery school", "kindergarten", "pre-school"]
      },
      {
        pl: "szkoła podstawowa",
        en: "primary school"
      },
      {
        pl: "szkoła prywatna",
        en: ["private school", "public school"]
      },
      {
        pl: "szkoła średnia",
        en: "secondary school"
      },
      {
        pl: "szkoła państwowa",
        en: "state school"
      },
      {
        pl: "uniwersytet",
        en: "university"
      },

      // Miejsca w szkole
      {
        pl: "stołówka",
        en: "canteen"
      },
      {
        pl: "klasa",
        en: "classroom"
      },
      {
        pl: "szatnia",
        en: "cloakroom"
      },
      {
        pl: "świetlica",
        en: "common room"
      },
      {
        pl: "pracownia komputerowa",
        en: "computer room"
      },
      {
        pl: "korytarz",
        en: "corridor"
      },
      {
        pl: "biurko",
        en: "desk"
      },
      {
        pl: "sala gimnastyczna",
        en: ["gym", "gymnasium"]
      },
      {
        pl: "aula",
        en: "hall"
      },
      {
        pl: "biblioteka",
        en: "library"
      },
      {
        pl: "szafka",
        en: "locker"
      },
      {
        pl: "sekretariat",
        en: "office"
      },
      {
        pl: ["boisko do zabawy", "plac zabaw"],
        en: "playground"
      },
      {
        pl: "sala do nauki (biologii, chemii, fizyki)",
        en: "science lab"
      },
      {
        pl: "boisko sportowe",
        en: "sports field"
      },
      {
        pl: "pokój nauczycielski",
        en: "staff room"
      },

      // Przybory szkolne
      {
        pl: "tablica",
        en: ["blackboard", "board"]
      },
      {
        pl: "dziennik lekcyjny",
        en: "class register"
      },
      {
        pl: "kredki",
        en: "crayons"
      },
      {
        pl: "słownik",
        en: "dictionary"
      },
      {
        pl: "klej",
        en: "glue"
      },
      {
        pl: "zeszyt",
        en: ["notebook", "exercise book"]
      },
      {
        pl: "strój gimnastyczny",
        en: "PE kit"
      },
      {
        pl: "piórnik",
        en: "pencil case"
      },
      {
        pl: "gumka",
        en: "rubber"
      },
      {
        pl: "linijka",
        en: "ruler"
      },
      {
        pl: "nożyczki",
        en: "scissors"
      },
      {
        pl: ["torba szkolna", "tornister"],
        en: "school bag"
      },
      {
        pl: "sprzęt sportowy",
        en: "sports equipment"
      },
      {
        pl: "podręcznik",
        en: ["textbook", "coursebook"]
      },
      {
        pl: "biała tablica",
        en: "whiteboard"
      },

      // Pracownicy szkoły i uczniowie
      {
        pl: "woźny",
        en: "caretaker"
      },
      {
        pl: "kolega ze szkoły",
        en: ["schoolmate", "classmate"]
      },
      {
        pl: "wychowawca",
        en: ["form teacher", "tutor"]
      },
      {
        pl: "dyrektor",
        en: ["head teacher", "headmaster"]
      },
      {
        pl: "bibliotekarz",
        en: "librarian"
      },
      {
        pl: ["profesor", "wykładowca akademicki"],
        en: "professor"
      },
      {
        pl: "uczeń",
        en: ["schoolboy", "schoolgirl", "student", "pupil"]
      },
      {
        pl: "grono pedagogiczne",
        en: "teaching staff"
      },

      // Oceny i egzaminy
      {
        pl: "średnia",
        en: "average"
      },
      {
        pl: "ściągać na egzaminie",
        en: "cheat in an exam"
      },
      {
        pl: "klasówka",
        en: "class test"
      },
      {
        pl: "nie zdać egzaminu",
        en: "fail an exam"
      },
      {
        pl: "egzamin końcowy",
        en: "final exam"
      },
      {
        pl: "dostać piątkę",
        en: "get an A"
      },
      {
        pl: "dostać wyniki czegoś",
        en: "get the results of something"
      },
      {
        pl: "ocena szkolna",
        en: ["mark", "grade"]
      },
      {
        pl: "egzamin ustny",
        en: "oral exam"
      },
      {
        pl: "zdać egzamin",
        en: "pass an exam"
      },
      {
        pl: "przygotowywać się do egzaminów",
        en: "prepare for exams"
      },
      {
        pl: "ponownie przystępować do egzaminu",
        en: "retake an exam"
      },
      {
        pl: "powtarzać do egzaminów",
        en: "revise for exams"
      },
      {
        pl: "egzamin na koniec nauki w szkole",
        en: "school-leaving exam"
      },
      {
        pl: "świadectwo szkolne",
        en: "school report"
      },
      {
        pl: "kartkówka",
        en: "short test"
      },
      {
        pl: "przygotowywać się do",
        en: "prepare for"
      },
      {
        pl: "wkuwać",
        en: "swot"
      },
      {
        pl: "przystępować do egzaminu",
        en: "take an exam"
      },
      {
        pl: "egzamin pisemny",
        en: "written exam"
      },

      // Życie szkolne
      {
        pl: "zajęcia pozalekcyjne",
        en: ["after-school activities", "after-school club"]
      },
      {
        pl: "uczęszczać",
        en: "attend"
      },
      {
        pl: "rozpoczynać szkołę",
        en: "begin school"
      },
      {
        pl: "przerwa na lunch",
        en: "lunch break"
      },
      {
        pl: "konkurs",
        en: "competition"
      },
      {
        pl: "obowiązkowy",
        en: "compulsory"
      },
      {
        pl: "skupić się",
        en: "concentrate"
      },
      {
        pl: "przeszkadzać",
        en: "disturb"
      },
      {
        pl: "zajęcia dodatkowe",
        en: "extra activities"
      },
      {
        pl: "uroczystość rozdania świadectw",
        en: "graduation ceremony"
      },
      {
        pl: "nieobowiązkowy",
        en: "optional"
      },
      {
        pl: "wywiadówka",
        en: "parent-teacher meeting"
      },
      {
        pl: "wycieczka szkolna",
        en: "school trip"
      },
      {
        pl: "mundurek szkolny",
        en: "school uniform"
      },
      {
        pl: "ferie zimowe",
        en: "winter holiday"
      },
      {
        pl: "plan lekcji",
        en: "timetable"
      },
      {
        pl: "lektury szkolne",
        en: "set books"
      },
      {
        pl: "semestr",
        en: "term"
      },

      // Przymiotniki - uczniowie i nauczyciele
      {
        pl: "ambitny",
        en: "ambitious"
      },
      {
        pl: "przeciętny",
        en: "average"
      },
      {
        pl: "kreatywny",
        en: "creative"
      },
      {
        pl: "wymagający",
        en: "demanding"
      },
      {
        pl: "wyluzowany",
        en: "easy-going"
      },
      {
        pl: "znakomity",
        en: "excellent"
      },
      {
        pl: "niesprawiedliwy",
        en: "unfair"
      },
      {
        pl: "uzdolniony",
        en: "gifted"
      },
      {
        pl: "pracowity",
        en: "hard-working"
      },
      {
        pl: "pomocny",
        en: "helpful"
      },
      {
        pl: "nieuczciwy",
        en: "dishonest"
      },
      {
        pl: "leniwy",
        en: "lazy"
      },
      {
        pl: "niecierpliwy",
        en: "impatient"
      },
      {
        pl: "niepunktualny",
        en: "unpunctual"
      },
      {
        pl: "szanowany",
        en: "respected"
      },
      {
        pl: "lekceważący",
        en: "disrespectful"
      },
      {
        pl: "surowy",
        en: "strict"
      },
      {
        pl: "utalentowany",
        en: "talented"
      },
      {
        pl: "nietolerancyjny",
        en: "intolerant"
      },
      {
        pl: "wyrozumiały",
        en: "understanding"
      },
      {
        pl: "dziwny",
        en: "weird"
      },

      // Zwroty
      {
        pl: "być nieobecnym w szkole",
        en: "be absent from school"
      },
      {
        pl: "być dobrym z czegoś",
        en: "be good at something"
      },
      {
        pl: "mieć kłopoty",
        en: "be in trouble"
      },
      {
        pl: "spóźnić się do szkoły",
        en: "be late for school"
      },
      {
        pl: "być dobrze przygotowanym",
        en: "be well prepared"
      },
      {
        pl: "odpisać pracę domową",
        en: "copy homework"
      },
      {
        pl: "robić ćwiczenie",
        en: "do an exercise"
      },
      {
        pl: "źle poradzić sobie na teście",
        en: "do badly in a test"
      },
      {
        pl: "dać z siebie wszystko",
        en: "do your best"
      },
      {
        pl: "odrabiać pracę domową",
        en: ["do your homework", "do homework"]
      },
      {
        pl: "mieć zaległości",
        en: "fall behind"
      },
      {
        pl: "dostać się do szkoły średniej",
        en: "get into secondary school"
      },
      {
        pl: "przygotowywać się",
        en: "get ready"
      },
      {
        pl: "zrobić sobie przerwę",
        en: ["take a break", "have a break"]
      },
      {
        pl: "uczyć się na pamięć",
        en: "learn by heart"
      },
      {
        pl: "rzucić szkołę",
        en: "leave school"
      },
      {
        pl: "wyszukać coś",
        en: "look something up"
      },
      {
        pl: "zrobić błąd",
        en: "make a mistake"
      },
      {
        pl: "robić postępy",
        en: "make progress"
      },
      {
        pl: "robić notatki",
        en: ["take notes", "make notes"]
      },
      {
        pl: "opuszczać lekcje",
        en: "miss lessons"
      },
      {
        pl: "brać w czymś udział",
        en: ["participate in something", "take part in something"]
      },
      {
        pl: "zwracać na kogoś uwagę",
        en: "pay attention to somebody"
      },
      {
        pl: "wagarować",
        en: "play truant"
      },
      {
        pl: "uczyć się pilnie",
        en: "study hard"
      },
      {
        pl: "sprawdzać listę obecności",
        en: "take the register"
      },
      {
        pl: "pisać wypracowanie",
        en: "write an essay"
      },

      // Inne
      {
        pl: "umiejętność",
        en: "ability"
      },
      {
        pl: "kontroler lotów",
        en: "air traffic controller"
      },
      {
        pl: "lotnictwo",
        en: "aviation"
      },
      {
        pl: "powodować",
        en: "cause"
      },
      {
        pl: "zawierać",
        en: "contain"
      },
      {
        pl: "krzyżówka",
        en: "crossword"
      },
      {
        pl: "zatłoczony",
        en: "crowded"
      },
      {
        pl: "zależeć od",
        en: "depend on"
      },
      {
        pl: "zwiększyć",
        en: "expand"
      },
      {
        pl: "najnowsze badania",
        en: "latest research"
      },
      {
        pl: "nieporozumienie",
        en: "misunderstanding"
      },
      {
        pl: "skończyć się czymś",
        en: "result in something"
      },
      {
        pl: "zestaw",
        en: "set"
      },
      {
        pl: "kleić się",
        en: "stick"
      },
      {
        pl: "aktualny",
        en: "up-to-date"
      }
    ];

    /* src/App.svelte generated by Svelte v3.32.1 */
    const file$6 = "src/App.svelte";

    // (32:1) {:else}
    function create_else_block$3(ctx) {
    	let maincontainer;
    	let current;

    	maincontainer = new MainContainer({
    			props: {
    				$$slots: { default: [create_default_slot$2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(maincontainer.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(maincontainer, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const maincontainer_changes = {};

    			if (dirty & /*$$scope, wordsLength*/ 514) {
    				maincontainer_changes.$$scope = { dirty, ctx };
    			}

    			maincontainer.$set(maincontainer_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(maincontainer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(maincontainer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(maincontainer, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_else_block$3.name,
    		type: "else",
    		source: "(32:1) {:else}",
    		ctx
    	});

    	return block;
    }

    // (29:0) {#if selectedQuiz}
    function create_if_block$4(ctx) {
    	let quiz;
    	let current;

    	quiz = new Quiz({
    			props: {
    				words: /*selectedQuiz*/ ctx[0],
    				wordsLength: /*wordsLength*/ ctx[1]
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(quiz.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(quiz, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const quiz_changes = {};
    			if (dirty & /*selectedQuiz*/ 1) quiz_changes.words = /*selectedQuiz*/ ctx[0];
    			if (dirty & /*wordsLength*/ 2) quiz_changes.wordsLength = /*wordsLength*/ ctx[1];
    			quiz.$set(quiz_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(quiz.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(quiz.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(quiz, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(29:0) {#if selectedQuiz}",
    		ctx
    	});

    	return block;
    }

    // (35:2) <Button click={() => { openQuiz("chapter1"); }}>
    function create_default_slot_4(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Chapter 1");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_4.name,
    		type: "slot",
    		source: "(35:2) <Button click={() => { openQuiz(\\\"chapter1\\\"); }}>",
    		ctx
    	});

    	return block;
    }

    // (36:2) <Button click={() => { openQuiz("chapter2"); }}>
    function create_default_slot_3(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Chapter 2");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_3.name,
    		type: "slot",
    		source: "(36:2) <Button click={() => { openQuiz(\\\"chapter2\\\"); }}>",
    		ctx
    	});

    	return block;
    }

    // (37:2) <Button click={() => { openQuiz("chapter3"); }}>
    function create_default_slot_2(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Chapter 3");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_2.name,
    		type: "slot",
    		source: "(37:2) <Button click={() => { openQuiz(\\\"chapter3\\\"); }}>",
    		ctx
    	});

    	return block;
    }

    // (38:2) <Button click={() => { openQuiz("chapter4"); }}>
    function create_default_slot_1(ctx) {
    	let t;

    	const block = {
    		c: function create() {
    			t = text("Chapter 4");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, t, anchor);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(t);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot_1.name,
    		type: "slot",
    		source: "(38:2) <Button click={() => { openQuiz(\\\"chapter4\\\"); }}>",
    		ctx
    	});

    	return block;
    }

    // (33:1) <MainContainer>
    function create_default_slot$2(ctx) {
    	let textinput;
    	let updating_value;
    	let t0;
    	let button0;
    	let t1;
    	let button1;
    	let t2;
    	let button2;
    	let t3;
    	let button3;
    	let current;

    	function textinput_value_binding(value) {
    		/*textinput_value_binding*/ ctx[3].call(null, value);
    	}

    	let textinput_props = { label: "Ilość słówek" };

    	if (/*wordsLength*/ ctx[1] !== void 0) {
    		textinput_props.value = /*wordsLength*/ ctx[1];
    	}

    	textinput = new TextInput({ props: textinput_props, $$inline: true });
    	binding_callbacks.push(() => bind(textinput, "value", textinput_value_binding));

    	button0 = new Button({
    			props: {
    				click: /*func*/ ctx[4],
    				$$slots: { default: [create_default_slot_4] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button1 = new Button({
    			props: {
    				click: /*func_1*/ ctx[5],
    				$$slots: { default: [create_default_slot_3] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button2 = new Button({
    			props: {
    				click: /*func_2*/ ctx[6],
    				$$slots: { default: [create_default_slot_2] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	button3 = new Button({
    			props: {
    				click: /*func_3*/ ctx[7],
    				$$slots: { default: [create_default_slot_1] },
    				$$scope: { ctx }
    			},
    			$$inline: true
    		});

    	const block = {
    		c: function create() {
    			create_component(textinput.$$.fragment);
    			t0 = space();
    			create_component(button0.$$.fragment);
    			t1 = space();
    			create_component(button1.$$.fragment);
    			t2 = space();
    			create_component(button2.$$.fragment);
    			t3 = space();
    			create_component(button3.$$.fragment);
    		},
    		m: function mount(target, anchor) {
    			mount_component(textinput, target, anchor);
    			insert_dev(target, t0, anchor);
    			mount_component(button0, target, anchor);
    			insert_dev(target, t1, anchor);
    			mount_component(button1, target, anchor);
    			insert_dev(target, t2, anchor);
    			mount_component(button2, target, anchor);
    			insert_dev(target, t3, anchor);
    			mount_component(button3, target, anchor);
    			current = true;
    		},
    		p: function update(ctx, dirty) {
    			const textinput_changes = {};

    			if (!updating_value && dirty & /*wordsLength*/ 2) {
    				updating_value = true;
    				textinput_changes.value = /*wordsLength*/ ctx[1];
    				add_flush_callback(() => updating_value = false);
    			}

    			textinput.$set(textinput_changes);
    			const button0_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				button0_changes.$$scope = { dirty, ctx };
    			}

    			button0.$set(button0_changes);
    			const button1_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				button1_changes.$$scope = { dirty, ctx };
    			}

    			button1.$set(button1_changes);
    			const button2_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				button2_changes.$$scope = { dirty, ctx };
    			}

    			button2.$set(button2_changes);
    			const button3_changes = {};

    			if (dirty & /*$$scope*/ 512) {
    				button3_changes.$$scope = { dirty, ctx };
    			}

    			button3.$set(button3_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(textinput.$$.fragment, local);
    			transition_in(button0.$$.fragment, local);
    			transition_in(button1.$$.fragment, local);
    			transition_in(button2.$$.fragment, local);
    			transition_in(button3.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(textinput.$$.fragment, local);
    			transition_out(button0.$$.fragment, local);
    			transition_out(button1.$$.fragment, local);
    			transition_out(button2.$$.fragment, local);
    			transition_out(button3.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_component(textinput, detaching);
    			if (detaching) detach_dev(t0);
    			destroy_component(button0, detaching);
    			if (detaching) detach_dev(t1);
    			destroy_component(button1, detaching);
    			if (detaching) detach_dev(t2);
    			destroy_component(button2, detaching);
    			if (detaching) detach_dev(t3);
    			destroy_component(button3, detaching);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_default_slot$2.name,
    		type: "slot",
    		source: "(33:1) <MainContainer>",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let link;
    	let t;
    	let current_block_type_index;
    	let if_block;
    	let if_block_anchor;
    	let current;
    	const if_block_creators = [create_if_block$4, create_else_block$3];
    	const if_blocks = [];

    	function select_block_type(ctx, dirty) {
    		if (/*selectedQuiz*/ ctx[0]) return 0;
    		return 1;
    	}

    	current_block_type_index = select_block_type(ctx);
    	if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

    	const block = {
    		c: function create() {
    			link = element("link");
    			t = space();
    			if_block.c();
    			if_block_anchor = empty();
    			attr_dev(link, "href", "https://fonts.googleapis.com/css?family=Asap");
    			attr_dev(link, "rel", "stylesheet");
    			add_location(link, file$6, 1, 2, 16);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			append_dev(document.head, link);
    			insert_dev(target, t, anchor);
    			if_blocks[current_block_type_index].m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			let previous_block_index = current_block_type_index;
    			current_block_type_index = select_block_type(ctx);

    			if (current_block_type_index === previous_block_index) {
    				if_blocks[current_block_type_index].p(ctx, dirty);
    			} else {
    				group_outros();

    				transition_out(if_blocks[previous_block_index], 1, 1, () => {
    					if_blocks[previous_block_index] = null;
    				});

    				check_outros();
    				if_block = if_blocks[current_block_type_index];

    				if (!if_block) {
    					if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
    					if_block.c();
    				} else {
    					if_block.p(ctx, dirty);
    				}

    				transition_in(if_block, 1);
    				if_block.m(if_block_anchor.parentNode, if_block_anchor);
    			}
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(if_block);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(if_block);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			detach_dev(link);
    			if (detaching) detach_dev(t);
    			if_blocks[current_block_type_index].d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots("App", slots, []);
    	let selectedQuiz = null;
    	let wordsLength = 10;
    	let quizes = { chapter1, chapter2, chapter3, chapter4 };

    	const openQuiz = name => {
    		$$invalidate(0, selectedQuiz = quizes[name]);
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== "$$") console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function textinput_value_binding(value) {
    		wordsLength = value;
    		$$invalidate(1, wordsLength);
    	}

    	const func = () => {
    		openQuiz("chapter1");
    	};

    	const func_1 = () => {
    		openQuiz("chapter2");
    	};

    	const func_2 = () => {
    		openQuiz("chapter3");
    	};

    	const func_3 = () => {
    		openQuiz("chapter4");
    	};

    	$$self.$capture_state = () => ({
    		Button,
    		MainContainer,
    		Quiz,
    		TextInput,
    		chapter1,
    		chapter2,
    		chapter3,
    		chapter4,
    		selectedQuiz,
    		wordsLength,
    		quizes,
    		openQuiz
    	});

    	$$self.$inject_state = $$props => {
    		if ("selectedQuiz" in $$props) $$invalidate(0, selectedQuiz = $$props.selectedQuiz);
    		if ("wordsLength" in $$props) $$invalidate(1, wordsLength = $$props.wordsLength);
    		if ("quizes" in $$props) quizes = $$props.quizes;
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		selectedQuiz,
    		wordsLength,
    		openQuiz,
    		textinput_value_binding,
    		func,
    		func_1,
    		func_2,
    		func_3
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {}
    });

    return app;

}());
//# sourceMappingURL=bundle.js.map
