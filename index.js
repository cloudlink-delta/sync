// Name: CLΔ Sync
// ID: cldeltasync
// Description: Plugin to enable list/variable synchronization between players for CLΔ Core.
// By: MikeDEV <https://scratch.mit.edu/users/MikeDEVTheDucklord/>
// License: MIT

/*
	CloudLink Delta Sync Plugin

	MIT License

	Copyright (C) 2025 CloudLink Delta.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.
*/

(function (Scratch) {
	"use strict";
	const blockIcon =
		"data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22312%22%20height%3D%22218%22%20viewBox%3D%220%200%20312%20218%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M155.88%200C194.829%200.000212318%20226.786%2030.1084%20229.987%2068.4414H237.391C278.466%2068.4414%20311.759%20101.922%20311.759%20143.221C311.759%20184.52%20278.466%20218%20237.391%20218H74.3682C33.2934%20218%200%20184.52%200%20143.221C0.000123011%20101.922%2033.2935%2068.4415%2074.3682%2068.4414H81.7715C84.9733%2030.1082%20116.931%200%20155.88%200ZM155.88%2010C122.221%2010%2094.5136%2036.0335%2091.7373%2069.2744L90.9717%2078.4414H74.3682C38.8684%2078.4415%2010.0001%20107.392%2010%20143.221C10%20179.049%2038.8683%20208%2074.3682%20208H237.391C272.891%20208%20301.759%20179.049%20301.759%20143.221C301.759%20107.392%20272.891%2078.4414%20237.391%2078.4414H220.788L220.023%2069.2744C217.246%2036.0337%20189.539%2010.0002%20155.88%2010Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M109.5%20180V172.5L149.85%2072.4502H162L202.2%20172.5V180H109.5ZM124.95%20167.85H186.6L161.55%20102.45C161.25%20101.65%20160.7%20100.2%20159.9%2098.1002C159.1%2096.0002%20158.3%2093.8502%20157.5%2091.6502C156.8%2089.3502%20156.25%2087.6002%20155.85%2086.4002C155.35%2088.4002%20154.75%2090.4502%20154.05%2092.5502C153.45%2094.5502%20152.8%2096.4002%20152.1%2098.1002C151.5%2099.8002%20151%20101.25%20150.6%20102.45L124.95%20167.85Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E";

	const menuIcon =
		"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzczIiBoZWlnaHQ9IjM3MyIgdmlld0JveD0iMCAwIDM3MyAzNzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE4Ni41IiBjeT0iMTg2LjUiIHI9IjE4Ni41IiBmaWxsPSIjMEY3RUJEIi8+CjxwYXRoIGQ9Ik0xODYuODggNjFDMjI1LjgyOSA2MS4wMDAyIDI1Ny43ODYgOTEuMTA4NCAyNjAuOTg3IDEyOS40NDFIMjY4LjM5MUMzMDkuNDY2IDEyOS40NDEgMzQyLjc1OSAxNjIuOTIyIDM0Mi43NTkgMjA0LjIyMUMzNDIuNzU5IDI0NS41MiAzMDkuNDY2IDI3OSAyNjguMzkxIDI3OUgxMDUuMzY4QzY0LjI5MzQgMjc5IDMxIDI0NS41MiAzMSAyMDQuMjIxQzMxLjAwMDEgMTYyLjkyMiA2NC4yOTM1IDEyOS40NDIgMTA1LjM2OCAxMjkuNDQxSDExMi43NzJDMTE1Ljk3MyA5MS4xMDgyIDE0Ny45MzEgNjEgMTg2Ljg4IDYxWk0xODYuODggNzFDMTUzLjIyMSA3MSAxMjUuNTE0IDk3LjAzMzUgMTIyLjczNyAxMzAuMjc0TDEyMS45NzIgMTM5LjQ0MUgxMDUuMzY4QzY5Ljg2ODQgMTM5LjQ0MiA0MS4wMDAxIDE2OC4zOTIgNDEgMjA0LjIyMUM0MSAyNDAuMDQ5IDY5Ljg2ODMgMjY5IDEwNS4zNjggMjY5SDI2OC4zOTFDMzAzLjg5MSAyNjkgMzMyLjc1OSAyNDAuMDQ5IDMzMi43NTkgMjA0LjIyMUMzMzIuNzU5IDE2OC4zOTIgMzAzLjg5MSAxMzkuNDQxIDI2OC4zOTEgMTM5LjQ0MUgyNTEuNzg4TDI1MS4wMjMgMTMwLjI3NEMyNDguMjQ2IDk3LjAzMzcgMjIwLjUzOSA3MS4wMDAyIDE4Ni44OCA3MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDAuNSAyNDFWMjMzLjVMMTgwLjg1IDEzMy40NUgxOTNMMjMzLjIgMjMzLjVWMjQxSDE0MC41Wk0xNTUuOTUgMjI4Ljg1SDIxNy42TDE5Mi41NSAxNjMuNDVDMTkyLjI1IDE2Mi42NSAxOTEuNyAxNjEuMiAxOTAuOSAxNTkuMUMxOTAuMSAxNTcgMTg5LjMgMTU0Ljg1IDE4OC41IDE1Mi42NUMxODcuOCAxNTAuMzUgMTg3LjI1IDE0OC42IDE4Ni44NSAxNDcuNEMxODYuMzUgMTQ5LjQgMTg1Ljc1IDE1MS40NSAxODUuMDUgMTUzLjU1QzE4NC40NSAxNTUuNTUgMTgzLjggMTU3LjQgMTgzLjEgMTU5LjFDMTgyLjUgMTYwLjggMTgyIDE2Mi4yNSAxODEuNiAxNjMuNDVMMTU1Ljk1IDIyOC44NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=";


	// Require the plugin to be unsandboxed
	if (!Scratch.extensions.unsandboxed) {
		alert("The CloudLink Delta Sync plugin must be loaded in an unsandboxed environment.");
		return;
	}

	// Require access to the VM and/or runtime
	if (!Scratch.vm || !Scratch.vm.runtime) {
		alert(
			"The CloudLink Delta Sync plugin could not detect access to the Scratch VM and/or runtime; this plugin won't work."
		);
		return;
	}

	// Require browser to support Web Locks API (used for concurrency)
	if (!navigator.locks) {
		alert(
			"The CloudLink Delta Sync plugin could not detect Web Locks support; this plugin won't work."
		);
		return;
	}

	// Require core extension to be loaded
	const core = Scratch.vm.runtime.ext_cldelta_core;
	if (!core) {
		alert(
			"The CloudLink Delta Sync plugin could not detect the CloudLink Delta Core extension; please load it first."
		);
		return;
	}

    /*
        Networked Variables Helper Class

        MIT License

        Copyright (C) 2023 Mike Renaker "MikeDEV".
    */
    class NetworkedVariables {

        /**
         * Initializes a new instance of the NetworkedVariables class.
         * Sets up the internal data structures to track variable and list events.
         * 
         * - blessedListBackup: A map to store the original targets and clone IDs of blessed lists.
         * - listEvents: A map to manage events related to lists.
         * - varEvents: A map to manage events related to variables.
         */
        constructor() {
            this.networkUpdateTracker = {
                global: new Map(),
                local: new Map(),
                clone: new Map()
            };
            this.varEvents = {
                global: new Map(),
                local: new Map(),
                clone: new Map()
            };
            this.listEvents = {
                global: new Map(),
                local: new Map(),
                clone: new Map()
            };
        }

        /**
         * Updates the value of a proxy variable while masking the event trigger.
         * Used to update the value of a networked variable without triggering events.
         * @param {Object} metadata - Metadata containing information about the proxy to access. Generated by the makeNetworkedVariable function.
         * @param {any} newvalue - The new value to assign to the proxy without event triggering.
         */
        updateProxyVariable(metadata, newvalue) {

            /* 
            metadata = {
                id: string,
                class: "global" | "local" | "clone",
                target: 0 | string
            }
            */

            if (!metadata) return;
            let proxy;

            switch (metadata.class) {
                case "global":
                    proxy = vm.runtime.targets[metadata.target].variables[metadata.id];
                    break;
                case "local":
                case "clone":
                    proxy = vm.runtime.getTargetById(metadata.target).variables[metadata.id];
                    break;
                default:
                    throw new Error("Unhandled class type.");
            }
            
            // If the variable is not blessed, return
            if (!proxy) return;

            // Set flag to mask event trigger
            this.networkUpdateTracker[metadata.class].get(metadata.id).current = true;
            
            // Set new value
            proxy.value = newvalue;
        }

        /**
         * Updates the value of a proxy array while masking the event trigger.
         * Used to update the value of a networked array without triggering events.
         * @param {Object} metadata - Metadata containing information about the proxy to access. Generated by the makeNetworkedList function.
         * @param {any} newvalue - The new value to assign to the proxy without event triggering.
         */
        updateProxyArray(metadata, method, newvalue) {

            /* 
            metadata = {
                id: string,
                class: "global" | "local" | "clone",
                target: 0 | string
            }
            */

            if (!metadata) return;
            let proxy;

            switch (metadata.class) {
                case "global":
                    proxy = vm.runtime.targets[metadata.target].variables[metadata.id];
                    break;
                case "local":
                case "clone":
                    proxy = vm.runtime.getTargetById(metadata.target).variables[metadata.id];
                    break;
                default:
                    throw new Error("Unhandled class type.");
            }
            
            // If the variable is not blessed, return
            if (!proxy) return;

            // Set flag to mask event trigger
            this.networkUpdateTracker[metadata.class].get(metadata.id).current = true;
            
            // Set new value
            switch (method) {
                case "reset":
                case "set":
                    proxy.value = newvalue;
                    break;
                case "length":
                    proxy.value.length = newvalue;
                    return;
                case "replace":
                    proxy.value[newvalue.property] = newvalue.value;
                    break;
            }

            // Refresh monitor for list
            proxy._monitorUpToDate = false;
        }

        /**
         * Overwrites a variable with a proxy that can track changes. It also marks the variable for overwrites so that
         * the runtime can recognize the change.
         * 
         * @param {Object} myVar - The object containing the variable to be proxied.
         * @param {string} classtype - Whether the variable is operating in a global/local/clone target.
         * @returns {Array[Proxy, String]} - An array containing a proxy object for the variable and the event handler name of the variable.
         */
        createVariableProxy(myVar, classtype) {
            if (!this.varEvents[classtype].has(myVar.id)) {
                this.varEvents[classtype].set(myVar.id, {
                    on: myVar.id + "_on",
                    off: myVar.id + "_off",
                });
            }

            if (!myVar.hasOwnProperty("bless")) {
                const proxy = new Proxy(myVar, {
                    set(target, property, value) {
                        if (property === "value") Syncs.handle_var_update(myVar.id, classtype, value);
                        return Reflect.set(...arguments);
                    },
                });

                Object.defineProperty(proxy, "bless", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: true,
                });

                return [proxy, this.varEvents[classtype].get(myVar.id)];
            }

            return [myVar, this.varEvents[classtype].get(myVar.id)];
        }

        /**
         * Creates a proxy for an array to monitor and handle changes.
         * Triggers event handlers on modifications, such as setting or replacing elements.
         * 
         * @param {Object} myList - The object containing the array to be proxied.
         * @param {string} classtype - Whether the array is operating in a global/local/clone target.
         * @returns {Array[Proxy, Object]} - An array containing a proxy object for the array and an object of event handler names for the array.
         */
        createArrayProxy(myList, classtype) {
            let list = myList.value;

            if (!this.listEvents[classtype].has(myList.id)) {
                this.listEvents[classtype].set(myList.id, {
                    off: myList.id + "_off",
                    length: myList.id + "_length",
                    replace: myList.id + "_replace",
                    set: myList.id + "_set",
                    reset: myList.id + "_reset"
                });
            }

            if (!list.hasOwnProperty("bless")) {
                let proxy = new Proxy(list, {
                    set(target, property, value) {
                        target[property] = value;
                        Syncs.handle_list_update(myList.id, classtype, target, property, value);
                        return true;
                    },
                });
    
                Object.defineProperty(proxy, "bless", {
                    enumerable: false,
                    configurable: true,
                    writable: true,
                    value: true,
                });
    
                return [proxy, this.listEvents[classtype].get(myList.id)];
            }
            
            return [list, this.listEvents[classtype].get(myList.id)];
        }

        /**
         * Updates the internal state of the NetworkedVariables class to reflect
         * changes to variables and lists in the runtime. It checks for the existence
         * of variables and lists and marks them for updates if they don't exist
         * anymore. It also converts unblessed variables and lists to networked
         * variables and lists if they are found.
         */
        update() {
            this.networkUpdateTracker.global.keys().forEach((id) => {
                this.update_type(this.networkUpdateTracker.global.get(id), id);
            });

            this.networkUpdateTracker.local.keys().forEach((id) => {
                this.update_type(this.networkUpdateTracker.local.get(id), id);
            });

            this.networkUpdateTracker.clone.keys().forEach((id) => {
                this.update_type(this.networkUpdateTracker.clone.get(id), id);
            });
        }

        update_type(element, id) {
            switch (element.type) {
                case "var":
                    switch (element.classtype) {
                        case "global":

                            // Global variable was deleted
                            if (!vm.runtime.targets[0].variables[id]) {
                                console.log("Global variable", id, "was deleted");
                                core.callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;
                            }
                            break;

                        case "clone":

                            // Clone holdin the variable was deleted
                            if (!vm.runtime.getTargetById(element.clone_id)) {
                                console.log("Clone that was holding clone variable", id, "was deleted");
                                core.callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // Variable was deleted
                            } else if (!vm.runtime.getTargetById(element.clone_id).variables[id]) {
                                console.log("Clone variable", id, "was deleted");
                                core.callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;
                            }
                            break;

                        case "local":

                            // Variable was deleted
                            if (!vm.runtime.getTargetById(element.target_id).variables[id]) {
                                console.log("Local variable", id, "was deleted");
                                core.callbacks.call(this.varEvents[element.classtype].get(id).off);
                                this.varEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;
                            }
                            break;
                    }
                    break;

                case "list":
                    switch (element.classtype) {
                        case "global":

                            // Global list was deleted
                            if (!vm.runtime.targets[0].variables[id]) {
                                console.log("Global list", id, "was deleted");
                                core.callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                            } else {

                                // Global list was reset and needs to be re-blessed
                                if (!vm.runtime.targets[0].variables[id].value.hasOwnProperty("bless")) {
                                    this.rebless_list(element, id, element.classtype);
                                    return;
                                }
                            }
                            break;

                        case "clone":

                            // If the sprite that was managing the list was deleted, destroy bindings
                            if (!vm.runtime.getTargetById(element.clone_id)) {
                                console.log("Clone that was holding list", id, "was deleted");
                                core.callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // If the list was deleted in the clone, destroy bindings
                            } else if (!vm.runtime.getTargetById(element.clone_id).variables[id]) {
                                console.log("Clone list", id, "was deleted");
                                core.callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // List was reset and needs to be re-blessed
                            } else {
                                if (!vm.runtime.getTargetById(element.clone_id).variables[id].value.hasOwnProperty("bless")) {
                                    this.rebless_list(element, id, element.classtype);
                                    return;
                                }
                            }
                            break;

                        case "local":

                            // The list was deleted, so destroy it
                            if (!vm.runtime.getTargetById(element.target_id).variables[id]) {
                                console.log("Local list", id, "was deleted");
                                core.callbacks.call(this.listEvents[element.classtype].get(id).off);
                                this.listEvents[element.classtype].delete(id);
                                this.networkUpdateTracker[element.classtype].delete(id);
                                return;

                                // List was reset and needs to be re-blessed
                            } else {
                                if (!vm.runtime.getTargetById(element.target_id).variables[id].value.hasOwnProperty("bless")) {
                                    this.rebless_list(element, id, true);
                                    return;
                                }
                            }
                            break;
                    }
                    break;
            }
        }

        rebless_list(element, id, classtype) {
            let myList;
            switch (classtype) {
                case "global":
                    myList = vm.runtime.targets[0].variables[id];
                    break;

                case "clone":
                    myList = vm.runtime.getTargetById(element.clone_id).variables[id];
                    break;

                case "local":
                    myList = vm.runtime.getTargetById(element.target_id).variables[id];
                    break;
            }

            let [proxy, callback] = this.createArrayProxy(myList, classtype);

            switch (classtype) {
                case "global":
                    vm.runtime.targets[0].variables[id].value = proxy;
                    break;

                case "clone":
                    vm.runtime.getTargetById(element.clone_id).variables[id].value = proxy;
                    break;

                case "local":
                    vm.runtime.getTargetById(element.target_id).variables[id].value = proxy;
                    break;
            }

            let tracker = this.networkUpdateTracker[classtype].get(id);
            if (tracker.current) {
                tracker.current = false;
                tracker.last = true;
                return;
            }
            
            core.callbacks.call(callback.reset, proxy);
        }

        /**
         * Overwrites a variable with a proxy that can track changes. It also marks the variable for overwrites so that
         * the runtime can recognize the change.
         * 
         * @param {Object} myVar - The object containing the variable to be proxied.
         * @param {string } target_id - The target ID the variable was bound to.
         * @param {string | undefined} clone_id - Whether the variable is operating in a sprite clone, specify the ID. Otherwise it will be undefined.
         * @returns {Array[Proxy, string, Object]} - An array containing a proxy object for the variable, event handler IDs for the proxy, and metadata.
         */
        makeNetworkedVariable(myVar, target_id, clone_id = undefined) {
            var classtype = "";

            if (clone_id != undefined) {
                classtype = "clone";

            } else if (vm.runtime.getTargetById(target_id).variables[myVar.id]) {
                classtype = "local";

            } else if (vm.runtime.targets[0].variables[myVar.id]) {
                classtype = "global";

            } else {
                throw new Error("Unhandled variable state. Couldn't determine if variable is global, local, or clone-only.");
            }

            let metadata = {
                id: myVar.id,
                class: classtype,
                // target: 0 | string
                type: "var",
            }

            if (!this.networkUpdateTracker[classtype].has(myVar.id)) {
                this.networkUpdateTracker[classtype].set(myVar.id, {
                    current: false,
                    type: "var",
                    proxy: undefined,
                    classtype,
                    events: undefined,
                    is_clone: clone_id != undefined,
                    clone_id: clone_id,
                    target_id: target_id
                });
            }

            const [varProxy, events] = this.createVariableProxy(myVar, classtype);
            const tracker = this.networkUpdateTracker[classtype].get(myVar.id);
            tracker.proxy = varProxy;
            tracker.events = events;

            switch (classtype) {
                case "global":
                    vm.runtime.targets[0].variables[myVar.id] = varProxy;
                    metadata.target = 0;
                    break;

                case "local":
                    vm.runtime.getTargetById(target_id).variables[myVar.id] = varProxy;
                    metadata.target = target_id;
                    break;

                case "clone":
                    vm.runtime.getTargetById(clone_id).variables[myVar.id] = varProxy;
                    metadata.target = target_id;
                    break;
            }

            return [varProxy, events, metadata];
        }

        /**
         * Creates a proxy for an array to monitor and handle changes.
         * Triggers event handlers on modifications, such as setting or replacing elements.
         * 
         * @param {Object} myList - The object containing the array to be proxied.
         * @param {string} target_id - The target ID the array was bound to.
         * @param {string | undefined} clone_id - Whether the array is operating in a sprite clone, specify the ID. Otherwise it will be undefined.
         * @returns {Array[Proxy, Object, Object]} - An array containing a proxy object for the array, an object of event IDs for the array, and an object for metadata.
         */
        makeNetworkedList(myList, target_id, clone_id = undefined) {
            var classtype = "";

            if (clone_id != undefined) {
                classtype = "clone";

            } else if (vm.runtime.getTargetById(target_id).variables[myList.id]) {
                classtype = "local";

            } else if (vm.runtime.targets[0].variables[myList.id]) {
                classtype = "global";

            } else {
                throw new Error("Unhandled list state. Couldn't determine if variable is global, local, or clone-only.");
            }

            let metadata = {
                id: myList.id,
                class: classtype,
                // target: 0 | string
                type: "list"
            }

            if (!this.networkUpdateTracker[classtype].has(myList.id)) {
                this.networkUpdateTracker[classtype].set(myList.id, {
                    current: false,
                    type: "list",
                    proxy: undefined,
                    events: undefined,
                    classtype,
                    last: false,
                    is_clone: clone_id != undefined,
                    clone_id: clone_id,
                    target_id: target_id
                });
            }

            const [arrayProxy, events] = this.createArrayProxy(myList, classtype);
            const tracker = this.networkUpdateTracker[classtype].get(myList.id);
            tracker.proxy = arrayProxy;
            tracker.events = events;

            switch (classtype) {
                case "global":
                    vm.runtime.targets[0].variables[myList.id].value = arrayProxy;
                    metadata.target = 0;
                    break;

                case "local":
                    vm.runtime.getTargetById(target_id).variables[myList.id].value = arrayProxy;
                    metadata.target = target_id;
                    break;

                case "clone":
                    vm.runtime.getTargetById(clone_id).variables[myList.id].value = arrayProxy;
                    metadata.target = clone_id;
                    break;
            }

            return [arrayProxy, events, metadata];
        }

        handle_list_update(myListId, classtype, target, property, value) {
            const tracker = this.networkUpdateTracker[classtype].get(myListId);
            const events = this.listEvents[classtype].get(myListId);

            if (tracker.current) {
                tracker.current = false;
                tracker.last = true;
                return;
            
            } else {
                if (tracker.last) {
                    tracker.last = false;
                    return;
                }
                
                let eventType;
                if (property === "_monitorUpToDate") {
                    eventType = "set";
                } else if (property === "length") {
                    eventType = "length";
                } else if (!isNaN(property)) {
                    if (property < target.length) {
                        eventType = "replace";
                    } else {
                        eventType = "set";
                    }
                }

                switch (eventType) {
                    case "set":
                        core.callbacks.call(events.set, { property, value });
                        break;
                    case "replace":
                        core.callbacks.call(events.replace, { property, value });
                        break;
                    case "length":
                        core.callbacks.call(events.length, value);
                        break;
                    default:
                        throw new Error("Unhandled event type.");
                }
            }
        }

        handle_var_update(myVarId, classtype, value) {
            const tracker = this.networkUpdateTracker[classtype].get(myVarId);
            const events = this.varEvents[classtype].get(myVarId);
            if (tracker.current) {
                tracker.current = false;
            } else {
                core.callbacks.call(events.on, value);
            }
        }
    }

	class CloudLinkDelta_Sync {
		constructor() {
            this.Syncs = new NetworkedVariables();
        }

		getInfo() {
			return {
				id: "cldeltasync",
				name: "CLΔ Sync",
				menuIconURI: menuIcon,
				blockIconURI: blockIcon,
				color1: "#0F7EBD",
				blocks: [
                    {
                        opcode: "doGlobalSync",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate("[MODE] synchronization of [TYPE] [VAR] with everyone that has channel [CHANNEL]"),
                        arguments: {
                            MODE: {
                                menu: "mode",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: "true",
                            },
                            TYPE: {
                                menu: "type",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "variable",
                            },
                            VAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my variable",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                        },
                    },
                    {
                        opcode: "checkGlobalSync",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("is [TYPE] [VAR] synchronized with everyone that has channel [CHANNEL]?"),
                        arguments: {
                            TYPE: {
                                menu: "type",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "variable",
                            },
                            VAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my variable",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                        }
                    },
                    {
                        opcode: "doPrivateSync",
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate(
                            "[MODE] synchronization of [TYPE] [VAR] with player [PEER] in channel [CHANNEL]"
                        ),
                        arguments: {
                            MODE: {
                                menu: "mode",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.BOOLEAN,
                                defaultValue: "true",
                            },
                            TYPE: {
                                menu: "type",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "variable",
                            },
                            VAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my variable",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "B",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                        },
                    },
                    {
                        opcode: "checkPrivateSync",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate("is [TYPE] [VAR] synchronized with with player [PEER] in channel [CHANNEL]?"),
                        arguments: {
                            TYPE: {
                                menu: "type",
                                acceptReporters: true,
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "variable",
                            },
                            VAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "my variable",
                            },
                            PEER: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "B",
                            },
                            CHANNEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "default",
                            },
                        }
                    },
                ],
				menus: {
                    mode: {
                        items: [
                            { text: Scratch.translate("disable"), value: "false" },
                            { text: Scratch.translate("enable"), value: "true" },
                        ]
                    },
                    type: {
                        items: [
                            { text: Scratch.translate("variable"), value: "variable" },
                            { text: Scratch.translate("list"), value: "list" },
                        ]
                    },
                },
			};
		}

        doGlobalSync({TYPE, MODE, VAR, CHANNEL}) {}
        checkGlobalSync({TYPE, VAR, CHANNEL}) {}
        doPrivateSync({TYPE, MODE, VAR, PEER, CHANNEL}) {}
        checkPrivateSync({TYPE, VAR, PEER, CHANNEL}) {}
	}

	// Register the plugin
	const Sync = new CloudLinkDelta_Sync();
	Scratch.extensions.register(Sync);
	Scratch.vm.runtime.ext_cldelta_sync = Sync;
	console.log("CLΔ Sync plugin loaded.");
})(Scratch);