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

;(function (Scratch) {
  'use strict'
  const blockIcon =
    'data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%22312%22%20height%3D%22218%22%20viewBox%3D%220%200%20312%20218%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M155.88%200C194.829%200.000212318%20226.786%2030.1084%20229.987%2068.4414H237.391C278.466%2068.4414%20311.759%20101.922%20311.759%20143.221C311.759%20184.52%20278.466%20218%20237.391%20218H74.3682C33.2934%20218%200%20184.52%200%20143.221C0.000123011%20101.922%2033.2935%2068.4415%2074.3682%2068.4414H81.7715C84.9733%2030.1082%20116.931%200%20155.88%200ZM155.88%2010C122.221%2010%2094.5136%2036.0335%2091.7373%2069.2744L90.9717%2078.4414H74.3682C38.8684%2078.4415%2010.0001%20107.392%2010%20143.221C10%20179.049%2038.8683%20208%2074.3682%20208H237.391C272.891%20208%20301.759%20179.049%20301.759%20143.221C301.759%20107.392%20272.891%2078.4414%20237.391%2078.4414H220.788L220.023%2069.2744C217.246%2036.0337%20189.539%2010.0002%20155.88%2010Z%22%20fill%3D%22white%22%2F%3E%3Cpath%20d%3D%22M109.5%20180V172.5L149.85%2072.4502H162L202.2%20172.5V180H109.5ZM124.95%20167.85H186.6L161.55%20102.45C161.25%20101.65%20160.7%20100.2%20159.9%2098.1002C159.1%2096.0002%20158.3%2093.8502%20157.5%2091.6502C156.8%2089.3502%20156.25%2087.6002%20155.85%2086.4002C155.35%2088.4002%20154.75%2090.4502%20154.05%2092.5502C153.45%2094.5502%20152.8%2096.4002%20152.1%2098.1002C151.5%2099.8002%20151%20101.25%20150.6%20102.45L124.95%20167.85Z%22%20fill%3D%22white%22%2F%3E%3C%2Fsvg%3E'

  const menuIcon =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzczIiBoZWlnaHQ9IjM3MyIgdmlld0JveD0iMCAwIDM3MyAzNzMiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjE4Ni41IiBjeT0iMTg2LjUiIHI9IjE4Ni41IiBmaWxsPSIjMEY3RUJEIi8+CjxwYXRoIGQ9Ik0xODYuODggNjFDMjI1LjgyOSA2MS4wMDAyIDI1Ny43ODYgOTEuMTA4NCAyNjAuOTg3IDEyOS40NDFIMjY4LjM5MUMzMDkuNDY2IDEyOS40NDEgMzQyLjc1OSAxNjIuOTIyIDM0Mi43NTkgMjA0LjIyMUMzNDIuNzU5IDI0NS41MiAzMDkuNDY2IDI3OSAyNjguMzkxIDI3OUgxMDUuMzY4QzY0LjI5MzQgMjc5IDMxIDI0NS41MiAzMSAyMDQuMjIxQzMxLjAwMDEgMTYyLjkyMiA2NC4yOTM1IDEyOS40NDIgMTA1LjM2OCAxMjkuNDQxSDExMi43NzJDMTE1Ljk3MyA5MS4xMDgyIDE0Ny45MzEgNjEgMTg2Ljg4IDYxWk0xODYuODggNzFDMTUzLjIyMSA3MSAxMjUuNTE0IDk3LjAzMzUgMTIyLjczNyAxMzAuMjc0TDEyMS45NzIgMTM5LjQ0MUgxMDUuMzY4QzY5Ljg2ODQgMTM5LjQ0MiA0MS4wMDAxIDE2OC4zOTIgNDEgMjA0LjIyMUM0MSAyNDAuMDQ5IDY5Ljg2ODMgMjY5IDEwNS4zNjggMjY5SDI2OC4zOTFDMzAzLjg5MSAyNjkgMzMyLjc1OSAyNDAuMDQ5IDMzMi43NTkgMjA0LjIyMUMzMzIuNzU5IDE2OC4zOTIgMzAzLjg5MSAxMzkuNDQxIDI2OC4zOTEgMTM5LjQ0MUgyNTEuNzg4TDI1MS4wMjMgMTMwLjI3NEMyNDguMjQ2IDk3LjAzMzcgMjIwLjUzOSA3MS4wMDAyIDE4Ni44OCA3MVoiIGZpbGw9IndoaXRlIi8+CjxwYXRoIGQ9Ik0xNDAuNSAyNDFWMjMzLjVMMTgwLjg1IDEzMy40NUgxOTNMMjMzLjIgMjMzLjVWMjQxSDE0MC41Wk0xNTUuOTUgMjI4Ljg1SDIxNy42TDE5Mi41NSAxNjMuNDVDMTkyLjI1IDE2Mi42NSAxOTEuNyAxNjEuMiAxOTAuOSAxNTkuMUMxOTAuMSAxNTcgMTg5LjMgMTU0Ljg1IDE4OC41IDE1Mi42NUMxODcuOCAxNTAuMzUgMTg3LjI1IDE0OC42IDE4Ni44NSAxNDcuNEMxODYuMzUgMTQ5LjQgMTg1Ljc1IDE1MS40NSAxODUuMDUgMTUzLjU1QzE4NC40NSAxNTUuNTUgMTgzLjggMTU3LjQgMTgzLjEgMTU5LjFDMTgyLjUgMTYwLjggMTgyIDE2Mi4yNSAxODEuNiAxNjMuNDVMMTU1Ljk1IDIyOC44NVoiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo='

  // --- Dependency Checks ---
  if (!Scratch.extensions.unsandboxed) {
    alert(
      'The CloudLink Delta Sync plugin must be loaded in an unsandboxed environment.'
    )
    return
  }

  // Require access to the VM and/or runtime
  if (!Scratch.vm || !Scratch.vm.runtime) {
    alert(
      "The CloudLink Delta Sync plugin could not detect access to the Scratch VM and/or runtime; this plugin won't work."
    )
    return
  }

  // Require browser to support Web Locks API (used for concurrency)
  if (!navigator.locks) {
    alert(
      "The CloudLink Delta Sync plugin could not detect Web Locks support; this plugin won't work."
    )
    return
  }

  // Initialize the plugin loader
  if (!Scratch.vm.runtime.ext_cldelta_pluginloader) {
    Scratch.vm.runtime.ext_cldelta_pluginloader = new Array()
  }

  /* --- Block Utilities ---
		Based on Rotur.js by Mistium
		https://extensions.mistium.com/featured/Rotur.js

		MPL-2.0
		This Source Code is subject to the terms of the Mozilla Public License, v2.0,
		If a copy of the MPL was not distributed with this file,
		Then you can obtain one at https://mozilla.org/MPL/2.0/
	*/
  const opcodes = {
    conditional: (opcode, text, options = {}) => ({
      opcode,
      text: text.map(v => Scratch.translate(v)),
      blockType: Scratch.BlockType.CONDITIONAL,
      branchCount: text.length - 1,
      ...options
    }),

    reporter: (opcode, text, args = {}, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.REPORTER,
      text: Scratch.translate(text),
      arguments: args,
      ...options
    }),

    command: (opcode, text, args = {}, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.COMMAND,
      text: Scratch.translate(text),
      arguments: args,
      ...options
    }),

    boolean: (opcode, text, args = {}, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.BOOLEAN,
      text: Scratch.translate(text),
      arguments: args,
      ...options
    }),

    event: (opcode, text, options = {}) => ({
      opcode,
      blockType: Scratch.BlockType.EVENT,
      text: Scratch.translate(text),
      isEdgeActivated: false,
      ...options
    }),

    button: (text, func, options = {}) => ({
      blockType: Scratch.BlockType.BUTTON,
      text: Scratch.translate(text),
      func,
      ...options
    }),

    label: text => ({
      blockType: Scratch.BlockType.LABEL,
      text: Scratch.translate(text)
    }),

    separator: () => '---'
  }
  const args = {
    string: (value, options = {}) => ({
      type: Scratch.ArgumentType.STRING,
      defaultValue: value,
      ...options
    }),

    number: (value, options = {}) => ({
      type: Scratch.ArgumentType.NUMBER,
      defaultValue: value,
      ...options
    }),

    boolean: (value, options = {}) => ({
      type: Scratch.ArgumentType.BOOLEAN,
      defaultValue: value,
      ...options
    })
  }

  // --- Getters/Setters ---
  function getTarget (target_id, name, type = '') {
    const target = vm.runtime.getTargetById(target_id)
    if (!target) return undefined
    const variable = Object.values(target.variables).find(v => v.name === name && v.type === type)
    return variable
  }
  function setVariableTarget (target_id, target_variable, value) {
    const target = vm.runtime.getTargetById(target_id)
    if (target && target.variables[target_variable.id]) {
      target.variables[target_variable.id] = value
    }
  }
  function setListValueTarget (target_id, target_list, value) {
    const target = vm.runtime.getTargetById(target_id)
    if (target && target.variables[target_list.id]) {
      target.variables[target_list.id].value = value
    }
  }

  /*
    Networked Variables Helper Class

    MIT License

    Copyright (C) 2025 Mike J. Renaker "MikeDEV".
  */
  class NetworkedVariables {
    /**
     * @param {number} [retainedFrames=60] - The number of event frames to keep in memory.
     * @param {number} [updatesPerSecond=10] - The number of batches to process per second.
     */
    constructor (retainedFrames = 60, updatesPerSecond = 10) {
      this.onTransmit = null
      this.tracker = new Map()
      this.tagMap = new Map()
      this.eventStack = [[]]
      this.retainedFrames = retainedFrames
      this.lastFrameTime = Date.now()
      this.batchInterval = 1000 / updatesPerSecond
      this.timeAccumulator = 0
      this.lastProcessedFrameTime = Date.now()
      this.idleTimeout = 1000 // 1 second
    }

    // --- Frame Stack & Event Pushers ---
    getCurrentFrame () {
      return this.eventStack[this.eventStack.length - 1]
    }
    pushVarEventToFrame (target_id, target_variable, event_source, tag, value) {
      const event = {
        type: 'var',
        target_id,
        id: target_variable.id,
        name: target_variable.name,
        tag,
        value,
        source: event_source,
        timestamp: Date.now()
      }
      this.getCurrentFrame().push(event)
    }
    pushListEventToFrame (
      target_id,
      target_list,
      event_source,
      tag,
      event_type,
      value
    ) {
      const event = {
        type: 'list',
        target_id,
        id: target_list.id,
        name: target_list.name,
        tag,
        method: event_type,
        payload: value,
        source: event_source,
        timestamp: Date.now()
      }
      this.getCurrentFrame().push(event)
    }

    // --- Proxy Creators ---
    createVariableProxy (target_id, target_variable, tag) {
      const self = this
      if (!target_variable.hasOwnProperty('bless')) {
        const proxy = new Proxy(target_variable, {
          set (_, property, value) {
            if (property === 'value')
              self._handleVarUpdate(target_id, target_variable, tag, value)
            return Reflect.set(...arguments)
          }
        })
        Object.defineProperty(proxy, 'bless', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: true
        })
        return proxy
      }
      return target_variable
    }
    createArrayProxy (target_id, target_list, tag) {
      const self = this
      const list = target_list.value
      if (!list.hasOwnProperty('bless')) {
        const proxy = new Proxy(list, {
          set (target, property, value) {
            target[property] = value
            self._handleListUpdate(target_id, target_list, tag, property, value)
            return true
          }
        })
        Object.defineProperty(proxy, 'bless', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: true
        })
        return proxy
      }
      return target_list.value
    }

    // --- Main Loop & Event Transmission ---
    update () {
      // --- 1. Variable Health Check ---
      this._healthCheck()

      // --- 2. Time Calculation ---
      const now = Date.now()
      const deltaTime = now - this.lastFrameTime
      this.lastFrameTime = now
      this.timeAccumulator += deltaTime

      // --- 3. Idle Timeout Check (Runs every tick) ---
      // Check if it's been over 1 second since we last processed a frame
      if (now - this.lastProcessedFrameTime > this.idleTimeout) {
        // We are idle. Check if there's anything to reset.
        if (this.eventStack.length > 1 || this.timeAccumulator > 0) {
          this.eventStack = [[]]
          this.timeAccumulator = 0
        }
        // Reset the idle timer to prevent this from running every tick
        this.lastProcessedFrameTime = now
      }

      // --- 4. Batch Processing Check ---
      // If not enough time has passed for a batch, do nothing else.
      if (this.timeAccumulator < this.batchInterval) {
        return
      }

      // --- Time to process a batch ---
      this.timeAccumulator = this.timeAccumulator % this.batchInterval
      const frameToProcess = this.getCurrentFrame()
      const frameIndex = this.eventStack.length - 1

      // If no events happened in this batch, we can skip creating a new frame
      if (frameToProcess.length === 0) {
        // We log that we processed an empty frame, but we DON'T update
        // this.lastProcessedFrameTime. This allows the idle timer to continue.
        // console.log(`[CLΔ Sync] Processing frame ${frameIndex} (events: 0)...`);
        return
      }

      // --- We have events, so we are NOT idle ---
      console.log(
        `[CLΔ Sync] Processing frame: ${frameIndex} events: ${frameToProcess.length}`
      )

      // We processed a non-empty frame, so reset the idle timer
      this.lastProcessedFrameTime = now

      // Add a new, empty frame for the *next* batch
      this.eventStack.push([])

      // --- 5. Process Events from the Completed Frame ---
      for (const event of frameToProcess) {
        if (event.source === 'local') {
          this.transmitEvent(event)
        }
      }

      // --- 6. Housekeeping: Drop Old Frames ---
      while (this.eventStack.length > this.retainedFrames) {
        this.eventStack.shift()
      }
    }

    transmitEvent (event) {
      let networkPayload
      if (event.type === 'var') {
        networkPayload = {
          type: 'var',
          tag: event.tag,
          value: event.value,
          timestamp: event.timestamp
        }
      } else if (event.type === 'list') {
        networkPayload = {
          type: 'list',
          tag: event.tag,
          method: event.method,
          payload: event.payload,
          timestamp: event.timestamp
        }
      }
      if (networkPayload && this.onTransmit) {
        this.onTransmit(networkPayload)
      }
    }

    // --- Health Check & Re-bless ---
    _healthCheck () {
      for (const [target_id, varMap] of this.tracker.entries()) {
        const target = vm.runtime.getTargetById(target_id)
        if (!target) {
          console.log(
            `[CLΔ Sync] Networked target ${target_id} was deleted. Removing trackers.`
          )
          for (const tracker_elem of varMap.values()) {
            console.log(`  > Removing tag: ${tracker_elem.tag}`)
            this.tagMap.delete(tracker_elem.tag)
          }
          this.tracker.delete(target_id)
          continuelastProcessedFrameTime
        }
        for (const [var_id, tracker_elem] of varMap.entries()) {
          const variable = target.variables[var_id]
          if (!variable) {
            console.log(
              `[CLΔ Sync] Networked item "${tracker_elem.tag}" (ID: ${var_id}) was deleted from target ${target_id}. Removing tracker.`
            )
            this.tagMap.delete(tracker_elem.tag)
            varMap.delete(var_id)
            continue
          }
          if (tracker_elem.type === 'list') {
            if (!variable.value.hasOwnProperty('bless')) {
              this.rebless_list(target_id, var_id)
            }
          }
        }
      }
    }
    rebless_list (target_id, list_id) {
      const target_list =
        vm.runtime.getTargetById(target_id)?.variables[list_id]
      if (!target_list) return
      const tracker_elem = this.tracker.get(target_id)?.get(list_id)
      if (!tracker_elem) return
      const tag = tracker_elem.tag
      const listProxy = this.createArrayProxy(target_id, target_list, tag)
      setListValueTarget(target_id, target_list, listProxy)
      tracker_elem.proxy = listProxy
      tracker_elem.parentList = target_list
      if (tracker_elem.current) {
        tracker_elem.current = false
        tracker_elem.last = true
      }
      this.pushListEventToFrame(
        target_id,
        target_list,
        'local',
        tag,
        'reset',
        target_list.value
      )
      return listProxy
    }

    // --- Public API: Registration ---
    /**
     * @returns {boolean} - True on success, false on failure.
     */
    makeNetworkedVariable (target_id, variable_name, tag) {
      if (this.tagMap.has(tag)) {
        const existing = this.tagMap.get(tag)
        if (
          existing.name === variable_name &&
          existing.target_id === target_id
        ) {
          return true // Already registered
        }
        // Use console.warn instead of throw
        console.warn(
          `[CLΔ Sync] Tag "${tag}" is already in use for a different variable. Tags must be unique.`
        )
        return false // Return false on failure
      }
      const target_variable = getTarget(target_id, variable_name)
      if (!target_variable) {
        console.warn(
          `[CLΔ Sync] Variable "${variable_name}" not found on target "${target_id}"`
        )
        return false // Return false on failure
      }
      const varProxy = this.createVariableProxy(target_id, target_variable, tag)
      setVariableTarget(target_id, target_variable, varProxy)
      if (!this.tracker.has(target_id)) this.tracker.set(target_id, new Map())
      const tracker_elem = {
        type: 'var',
        id: target_variable.id,
        name: target_variable.name,
        target_id: target_id,
        current: false,
        proxy: varProxy,
        tag: tag,
        lastKnownState: target_variable.value
      }
      this.tracker.get(target_id).set(target_variable.id, tracker_elem)
      this.tagMap.set(tag, tracker_elem)
      return true // Return true on success
    }

    /**
     * @returns {boolean} - True on success, false on failure.
     */
    makeNetworkedList (target_id, list_name, tag) {
      if (this.tagMap.has(tag)) {
        const existing = this.tagMap.get(tag)
        if (existing.name === list_name && existing.target_id === target_id) {
          return true // Already registered
        }
        // Use console.warn instead of throw
        console.warn(
          `[CLΔ Sync] Tag "${tag}" is already in use for a different list. Tags must be unique.`
        )
        return false // Return false on failure
      }
      const target_list = getTarget(target_id, list_name)
      if (!target_list) {
        console.warn(
          `[CLΔ Sync] List "${list_name}" not found on target "${target_id}"`
        )
        return false // Return false on failure
      }
      const listProxy = this.createArrayProxy(target_id, target_list, tag)
      setListValueTarget(target_id, target_list, listProxy)
      if (!this.tracker.has(target_id)) this.tracker.set(target_id, new Map())
      const tracker_elem = {
        type: 'list',
        id: target_list.id,
        name: target_list.name,
        target_id: target_id,
        current: false,
        last: false,
        proxy: listProxy,
        parentList: target_list,
        tag: tag,
        lastKnownState: [...target_list.value]
      }
      this.tracker.get(target_id).set(target_list.id, tracker_elem)
      this.tagMap.set(tag, tracker_elem)
      return true // Return true on success
    }

    removeNetworked (tag) {
      const tracker = this.tagMap.get(tag)
      if (!tracker) return false

      try {
        if (tracker.type === 'var') {
          // It's a variable. Re-create a plain variable object
          // and replace the proxy in the VM.
          const plainVar = {
            id: tracker.id,
            name: tracker.name,
            type: tracker.proxy.type, // e.g., "" or "broadcast_msg"
            value: tracker.proxy.value, // Get the current value
            isCloud: tracker.proxy.isCloud || false
            // Note: No 'bless' property, so it's not a proxy
          }
          // Set the new plain object in the VM
          setVariableTarget(tracker.target_id, { id: tracker.id }, plainVar)
        } else if (tracker.type === 'list') {
          // It's a list. Get the parent list object.
          const parentList = tracker.parentList
          if (parentList) {
            // Create a new, non-proxied array from the proxy's current state
            const plainArray = [...tracker.proxy]
            // Set this new plain array back into the parent list object
            setListValueTarget(tracker.target_id, parentList, plainArray)
          }
        }
      } catch (e) {
        // This might fail if the target/var was deleted, but healthCheck
        // should have caught it. Still, good to be safe.
        console.warn(
          `[CLΔ Sync] Error while un-proxying tag "${tag}": ${e.message}`
        )
      }

      // Now, remove it from internal tracking
      this.tagMap.delete(tag)
      const varMap = this.tracker.get(tracker.target_id)
      if (varMap) {
        varMap.delete(tracker.id)
        console.log(`[CLΔ Sync] Disabled sync and un-proxied tag "${tag}"`)
        return true
      }

      return false // varMap wasn't found, which is strange but handled.
    }

    // --- Public API: Receiving Network Updates ---
    updateProxyVariable (tag, value) {
      const tracker_elem = this.tagMap.get(tag)
      if (!tracker_elem) return
      if (tracker_elem.type !== 'var') return
      tracker_elem.current = true
      tracker_elem.proxy.value = value
    }
    updateProxyArray (tag, method, payload) {
      const tracker_elem = this.tagMap.get(tag)
      if (!tracker_elem) return
      if (tracker_elem.type !== 'list') return
      const proxy = tracker_elem.proxy
      tracker_elem.current = true
      switch (method) {
        case 'reset':
        case 'set':
          proxy.length = 0
          if (Array.isArray(payload)) {
            proxy.push(...payload)
          }
          break
        case 'length':
          proxy.length = payload
          break
        case 'replace':
          proxy[payload.property] = payload.value
          break
      }
      if (tracker_elem.parentList) {
        tracker_elem.parentList._monitorUpToDate = false
      }
    }

    // --- Public API: Rollback ---
    rollbackToFrame (n, priority) {
      if (n <= 0) {
        console.warn(`[CLΔ Sync] Rollback value must be > 0.`)
        return
      }
      if (priority !== 'local' && priority !== 'network') {
        console.warn(
          `[CLΔ Sync] Rollback priority must be 'local' or 'network'.`
        )
        return
      }
      const frameIndex = this.eventStack.length - 1 - n
      if (frameIndex < 0 || frameIndex >= this.eventStack.length) {
        console.warn(
          `[CLΔ Sync] Cannot roll back ${n} frames. Only ${
            this.eventStack.length - 1
          } processed frames are in history.`
        )
        return
      }
      const frame = this.eventStack[frameIndex]
      console.log(
        `[CLΔ Sync] Rolling back to frame ${n} (index ${frameIndex}) with ${priority} priority...`
      )
      for (const event of frame) {
        if (event.source !== priority) {
          continue
        }
        if (event.type === 'var') {
          this.updateProxyVariable(event.tag, event.value)
        } else if (event.type === 'list') {
          this.updateProxyArray(event.tag, event.method, event.payload)
        }
      }
    }

    // --- Internal Handlers ---
    _handleListUpdate (target_id, target_list, tag, property, value) {
      const tracker_elem = this.tracker.get(target_id).get(target_list.id)
      let source = 'local'

      // 1. Feedback loop prevention
      if (tracker_elem.last) {
        tracker_elem.last = false
        tracker_elem.current = true
        source = 'network'
      } else if (tracker_elem.current) {
        tracker_elem.current = false
        source = 'network'
      }
      if (source === 'network') return

      // 2. Get old state for comparison
      const lastState = tracker_elem.lastKnownState

      // 3. Determine event type and payload
      let type
      let payload
      // We create a snapshot of the new state *now*
      // 'target_list.value' is the proxy, and spreading it creates
      // a new, non-proxied array with the *current* data.
      const newState = [...target_list.value]

      if (property === '_monitorUpToDate') {
        type = 'set'
        payload = newState
      } else if (property === 'length') {
        type = 'length'
        payload = value // This is the new length
      } else if (!isNaN(property)) {
        type = 'replace'
        payload = { property: property, value: value }
      } else {
        // Other operations (like push, pop) don't have a clean property
        // We will treat them as a 'set'
        type = 'set'
        payload = newState
      }

      // 4. --- De-duplication Check ---
      if (lastState) {
        // Only check if a 'lastState' exists
        switch (type) {
          case 'set':
            // Compare the new array to the last sent array
            if (
              payload.length === lastState.length &&
              payload.every((val, index) => val === lastState[index])
            ) {
              return // The lists are identical, do not send.
            }
            break
          case 'length':
            // Check if the length actually changed
            if (payload === lastState.length) {
              return // Length is the same, do not send.
            }
            break
          case 'replace':
            // Check if the value at the index actually changed
            if (lastState[payload.property] === payload.value) {
              return // The value is the same, do not send.
            }
            break
        }
      }

      // 5. Update the 'lastKnownState' to this new state
      // This ensures we don't send this update again until it changes
      tracker_elem.lastKnownState = newState

      // 6. Push the change to the frame stack
      this.pushListEventToFrame(
        target_id,
        target_list,
        'local',
        tag,
        type,
        payload
      )
    }

    _handleVarUpdate (target_id, target_variable, tag, value) {
      const tracker_elem = this.tracker.get(target_id).get(target_variable.id)
      let source = 'local'

      // 1. Feedback loop prevention
      if (tracker_elem.current) {
        tracker_elem.current = false
        source = 'network'
      }
      if (source === 'network') return

      // 2. --- De-duplication Check ---
      // Compare the new value to the last value we sent
      if (tracker_elem.lastKnownState === value) {
        return // Value has not changed, do not send.
      }

      // 3. Update the 'lastKnownState' to this new value
      tracker_elem.lastKnownState = value

      // 4. Push the change to the frame stack
      this.pushVarEventToFrame(target_id, target_variable, 'local', tag, value)
    }
  }

  class CloudLinkDelta_Sync {
    constructor () {
      this.netvars = new NetworkedVariables()
      this.netvars.onTransmit = payload => this.handleTransmit(payload)
      this.core = null
      this.broadcasts = new Map()
      this.multicasts = new Map()
      this.unicasts = new Map()
    }

    register (core) {
      this.core = core
      core.onMessage = core.onMessage || {}
      core.onMessage.sync = payload => this.handleReceive(payload)
      if (!core.plugins.includes('sync')) {
        core.plugins.push('sync')
        console.log('CLΔ Sync plugin registered.')
      }
    }

    handleTransmit (payload) {
      if (!this.core || !this.core.send) {
        return
      }
      const tag = payload.tag
      if (this.broadcasts.has(tag)) {
        const { channel } = this.broadcasts.get(tag)
        this.core.send('broadcast', { channel: channel, payload: payload })
      } else if (this.multicasts.has(tag)) {
        const { channel, list } = this.multicasts.get(tag)
        // TODO: Implement multicast send
      } else if (this.unicasts.has(tag)) {
        const { channel, peer } = this.unicasts.get(tag)
        // TODO: Implement unicast send
      }
    }

    handleReceive (message) {
      const payload = message.payload ? message.payload : message
      if (!payload || !payload.tag || !payload.type) {
        return
      }
      if (payload.type === 'var') {
        this.netvars.updateProxyVariable(payload.tag, payload.value)
      } else if (payload.type === 'list') {
        this.netvars.updateProxyArray(
          payload.tag,
          payload.method,
          payload.payload
        )
      }
    }

    getInfo () {
      return {
        id: 'cldeltasync',
        name: 'CLΔ Sync',
        menuIconURI: menuIcon,
        blockIconURI: blockIcon,
        color1: '#0F7EBD',
        blocks: [
          opcodes.label('Sync Tags'),
          opcodes.boolean('isTagInUse', 'is tag [TAG] in use?', {
            TAG: args.string('network tag')
          }),
          opcodes.reporter('getTagBinding', 'tag [TAG] currently bound to', {
            TAG: args.string('network tag')
          }),
          opcodes.boolean(
            'checkBroadcast',
            'is tag [TAG] broadcasting in channel [CHANNEL]?',
            {
              CHANNEL: args.string('default'),
              TAG: args.string('network tag')
            }
          ),
          opcodes.boolean(
            'checkMulticast',
            'is tag [TAG] multicasting to peers in [MCAST] list [LIST] in channel [CHANNEL]?',
            {
              CHANNEL: args.string('default'),
              MCAST: args.string('global', { menu: 'mcast' }),
              LIST: args.string('my peer list'),
              TAG: args.string('network tag')
            }
          ),
          opcodes.boolean(
            'checkUnicast',
            'is tag [TAG] unicasting with [PEER] in channel [CHANNEL]?',
            {
              TYPE: args.string('global variable', { menu: 'type' }),
              VAR: args.string('my variable'),
              CHANNEL: args.string('default'),
              PEER: args.string('B'),
              TAG: args.string('network tag')
            }
          ),
          opcodes.separator(),
          opcodes.label('Sync Commands'),
          opcodes.boolean(
            'doBroadcast',
            '[MODE] broadcast of [TYPE] [VAR] in channel [CHANNEL] and assign it as tag [TAG]',
            {
              MODE: args.string('enable', { menu: 'mode' }),
              TYPE: args.string('global variable', { menu: 'type' }),
              VAR: args.string('my variable'),
              CHANNEL: args.string('default'),
              TAG: args.string('network tag')
            }
          ),
          opcodes.boolean(
            'doMulticast',
            '[MODE] multicast of [TYPE] [VAR] in channel [CHANNEL] with peers in [MCAST] list [LIST] and assign it as tag [TAG]',
            {
              MODE: args.string('enable', { menu: 'mode' }),
              TYPE: args.string('global variable', { menu: 'type' }),
              MCAST: args.string('global', { menu: 'mcast' }),
              VAR: args.string('my variable'),
              CHANNEL: args.string('default'),
              LIST: args.string('my peer list'),
              TAG: args.string('network tag')
            }
          ),
          opcodes.boolean(
            'doUnicast',
            '[MODE] unicast of [TYPE] [VAR] with [PEER] in channel [CHANNEL] and assign it as tag [TAG]',
            {
              MODE: args.string('enable', { menu: 'mode' }),
              TYPE: args.string('global variable', { menu: 'type' }),
              VAR: args.string('my variable'),
              CHANNEL: args.string('default'),
              PEER: args.string('B'),
              TAG: args.string('network tag')
            }
          )
        ],
        menus: {
          mcast: {
            items: [Scratch.translate('global'), Scratch.translate('local')]
          },
          mode: {
            items: [Scratch.translate('disable'), Scratch.translate('enable')]
          },
          type: {
            items: [
              Scratch.translate('global variable'),
              Scratch.translate('local variable'),
              Scratch.translate('global list'),
              Scratch.translate('local list')
            ]
          }
        }
      }
    }

    isTagInUse ({ TAG }) {
      const tag = Scratch.Cast.toString(TAG)
      return this.netvars.tagMap.has(tag)
    }

    getTagBinding ({ TAG }) {
      const tag = Scratch.Cast.toString(TAG)
      const tracker = this.netvars.tagMap.get(tag)
      if (!tracker) return ''
      let scope = 'unknown'
      const target = vm.runtime.getTargetById(tracker.target_id)
      if (target) {
        if (target.isStage) {
          scope = 'global'
        } else {
          scope = 'local'
        }
      }
      const type = tracker.type === 'var' ? 'variable' : 'list'
      return `${scope} ${type}: ${tracker.name}`
    }

    doBroadcast ({ TYPE, MODE, VAR, CHANNEL, TAG }, util) {
      if (!this.core) return false
      TYPE = Scratch.Cast.toString(TYPE)
      MODE = Scratch.Cast.toString(MODE)
      const name = Scratch.Cast.toString(VAR)
      const tag = Scratch.Cast.toString(TAG)
      const channel = Scratch.Cast.toString(CHANNEL)
      const parts = TYPE.split(' ')
      const scope = parts[0]
      const type = parts[1]
      if (type !== 'variable' && type !== 'list') return false
      let target_id
      if (scope === 'global') {
        target_id = vm.runtime.getTargetForStage().id
      } else {
        target_id = util.target.id
      }

      if (MODE === 'disable') {
        this.broadcasts.delete(tag)
        return this.netvars.removeNetworked(tag)
      } else {
        // MODE === 'enable'
        // Removed try...catch, now checking boolean return
        let success = false
        if (type === 'variable') {
          success = this.netvars.makeNetworkedVariable(target_id, name, tag)
        } else {
          success = this.netvars.makeNetworkedList(target_id, name, tag)
        }

        if (success) {
          this.broadcasts.set(tag, { channel: channel })
          this.multicasts.delete(tag)
          this.unicasts.delete(tag)
          return true
        } else {
          // Failure was already logged by netvars
          return false
        }
      }
    }

    checkBroadcast ({ CHANNEL, TAG }) {
      if (!this.core) return false
      const tag = Scratch.Cast.toString(TAG)
      const channel = Scratch.Cast.toString(CHANNEL)
      const broadcast = this.broadcasts.get(tag)
      if (!broadcast) return false
      return broadcast.channel === channel
    }

    doMulticast ({ TYPE, MODE, VAR, CHANNEL, LIST, TAG, MCAST }, util) {
      if (!this.core) return false
      // Sanitize all inputs
      TYPE = Scratch.Cast.toString(TYPE)
      MODE = Scratch.Cast.toString(MODE)
      const name = Scratch.Cast.toString(VAR)
      const tag = Scratch.Cast.toString(TAG)
      const channel = Scratch.Cast.toString(CHANNEL)
      const listName = Scratch.Cast.toString(LIST)
      const mcast_scope = Scratch.Cast.toString(MCAST)

      const parts = TYPE.split(' ')
      const scope = parts[0]
      const type = parts[1]
      if (type !== 'variable' && type !== 'list') return false

      let target_id
      if (scope === 'global') {
        target_id = vm.runtime.getTargetForStage().id
      } else {
        target_id = util.target.id
      }

      let mcast_target_id
      if (mcast_scope == 'global') {
        mcast_target_id = vm.runtime.getTargetForStage().id
      } else {
        mcast_target_id = util.target.id
      }
      const mcast_target_list = getTarget(mcast_target_id, listName, 'list')
      if (!mcast_target_list) {
        console.warn(
          `Multicast target list "${listName}" not found in ${mcast_scope} scope for target ${mcast_target_id}`
        )
        return false
      }

      if (MODE === 'disable') {
        this.multicasts.delete(tag)
        return this.netvars.removeNetworked(tag)
      } else {
        // MODE === 'enable'
        let success = false
        if (type === 'variable') {
          success = this.netvars.makeNetworkedVariable(target_id, name, tag)
        } else {
          success = this.netvars.makeNetworkedList(target_id, name, tag)
        }

        if (success) {
          this.multicasts.set(tag, { channel: channel, target: mcast_target_id, list: mcast_target_list.id })
          this.broadcasts.delete(tag)
          this.unicasts.delete(tag)
          return true
        } else {
          return false
        }
      }
    }

    checkMulticast ({ CHANNEL, LIST, TAG, MCAST }) {
      if (!this.core) return false
      const tag = Scratch.Cast.toString(TAG)
      const channel = Scratch.Cast.toString(CHANNEL)
      const listName = Scratch.Cast.toString(LIST)
      const mcast_scope = Scratch.Cast.toString(MCAST)

      const multicast = this.multicasts.get(tag)
      if (!multicast) return false

      let mcast_target_id
      if (mcast_scope == 'global') {
        mcast_target_id = vm.runtime.getTargetForStage().id
      } else {
        mcast_target_id = util.target.id
      }
      const mcast_target_list = getTarget(mcast_target_id, listName, 'list')
      if (!mcast_target_list) {
        console.warn(
          `Multicast target list "${listName}" not found in ${mcast_scope} scope for target ${mcast_target_id}`
        )
        return false
      }

      return multicast.channel === channel && multicast.target === mcast_target_id && multicast.list === mcast_target_list.id
    }

    doUnicast ({ TYPE, MODE, VAR, PEER, CHANNEL, TAG }, util) {
      if (!this.core) return false
      // Sanitize all inputs
      TYPE = Scratch.Cast.toString(TYPE)
      MODE = Scratch.Cast.toString(MODE)
      const name = Scratch.Cast.toString(VAR)
      const tag = Scratch.Cast.toString(TAG)
      const channel = Scratch.Cast.toString(CHANNEL)
      const peer = Scratch.Cast.toString(PEER)

      const parts = TYPE.split(' ')
      const scope = parts[0]
      const type = parts[1]
      if (type !== 'variable' && type !== 'list') return false

      let target_id
      if (scope === 'global') {
        target_id = vm.runtime.getTargetForStage().id
      } else {
        target_id = util.target.id
      }

      if (MODE === 'disable') {
        this.unicasts.delete(tag)
        return this.netvars.removeNetworked(tag)
      } else {
        // MODE === 'enable'
        let success = false
        if (type === 'variable') {
          success = this.netvars.makeNetworkedVariable(target_id, name, tag)
        } else {
          success = this.netvars.makeNetworkedList(target_id, name, tag)
        }

        if (success) {
          this.unicasts.set(tag, { channel: channel, peer: peer })
          this.broadcasts.delete(tag)
          this.multicasts.delete(tag)
          return true
        } else {
          return false
        }
      }
    }

    checkUnicast ({ PEER, CHANNEL, TAG }) {
      if (!this.core) return false
      const tag = Scratch.Cast.toString(TAG)
      const channel = Scratch.Cast.toString(CHANNEL)
      const peer = Scratch.Cast.toString(PEER)

      const unicast = this.unicasts.get(tag)
      if (!unicast) return false

      return unicast.channel === channel && unicast.peer === peer
    }
  }

  // --- Plugin Registration ---
  const sync = new CloudLinkDelta_Sync()
  Scratch.extensions.register(sync)
  Scratch.vm.runtime.ext_cldelta_sync = sync
  console.log('CLΔ Sync plugin loaded.')

  const core = Scratch.vm.runtime.ext_cldelta_core
  if (core) {
    sync.register(core)
  } else {
    Scratch.vm.runtime.ext_cldelta_pluginloader.push(sync)
  }

  // Bind hook to the VM
  Scratch.vm.runtime.on('BEFORE_EXECUTE', () => {
    sync.netvars.update()
  })
})(Scratch)
