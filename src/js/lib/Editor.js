/* http://github.com/mindmup/bootstrap-wysiwyg */
/* global FormData:true */
/* eslint indent: ["error", "tab"], one-var: ["error", {'var':"always",'let':"never"}] */
export default function ($) {
	var getCookies = function () {
		var ret = {}
		if (document.cookie.length === 0) {
			return ret
		}
		let pairs = document.cookie.split(';')
		for (let i = 0; i < pairs.length; i++) {
			let kv = pairs[i].split('=')
			ret[kv[0].trim()] = kv[1]
		}
		return ret
	}
	let pasteHTMLAtRange = function (range, html) {
		range.deleteContents()
		var el = document.createElement('div'), frag = document.createDocumentFragment(), node, lastNode
		el.innerHTML = html
		node = el.firstChild
		lastNode = frag.appendChild(node)
		range.insertNode(frag)
		return lastNode
	}
	let indentCommand = function (sel) {
		let range = sel.getRangeAt(0)
		let spacesNode = pasteHTMLAtRange(range, '&nbsp&nbsp&nbsp&nbsp')
		let select = document.createRange()
		select.setStart(spacesNode, spacesNode.nodeValue.length)
		select.setEnd(spacesNode, spacesNode.nodeValue.length)
		sel.removeAllRanges()
		sel.addRange(select)
	}
	let insertImageCommand = function (sel, url) {
		let range = sel.getRangeAt(0)
		let spacesNode = pasteHTMLAtRange(range, '<img src=' + url + ' style="max-width:100%;">')
		let select = document.createRange()
		select.selectNode(spacesNode)
		select.collapse(false)
		sel.removeAllRanges()
		sel.addRange(select)
	}
	let outdentCommand = function (sel) {
		let range = sel.getRangeAt(0)
		let spacesNode = range.startContainer
		if (!spacesNode.nodeValue) {
			return
		}
		if (spacesNode.nodeValue.trim().length !== 0) {
			return
		}
		spacesNode.nodeValue = ''
		let select = document.createRange()
		if (!spacesNode.previousSibling) {
			return
		}
		select.selectNodeContents(spacesNode.previousSibling)
		select.collapse(false)
		sel.removeAllRanges()
		sel.addRange(select)
	}
	let readFileIntoDataUrl = function (fileInfo) {
		var def = $.Deferred(),
			formData = new FormData()
		formData.append('csrf', getCookies()['csrf'] || '')
		formData.append('file', fileInfo)
		$.ajax({
			type: 'POST',
			url: '/api/upload',
			data: formData,
			processData: false,
			contentType: false
		}).done(function (data) {
			if (data.error === 'ok') {
				def.resolve(data.url)
			} else {
				def.reject(data.msg)
			}
		}).fail(function (data) {
			def.reject(data.msg)
		})
		return def
	}
	$.fn.cleanHtml = function () {
		var html = $(this).html()
		return html && html.replace(/(<br>|\s|<div><br><\/div>|&nbsp)*$/, '')
	}
	$.fn.wysiwyg = function (userOptions) {
		var editor = this,
			selectedRange,
			options,
			toolbarBtnSelector,
			updateToolbar = function () {
				if (options.activeToolbarClass) {
					$(options.toolbarSelector).find(toolbarBtnSelector).each(function () {
						var command = $(this).data(options.commandRole)
						if (document.queryCommandState(command)) {
							$(this).addClass(options.activeToolbarClass)
						} else {
							$(this).removeClass(options.activeToolbarClass)
						}
					})
				}
			},
			execCommand = function (commandWithArgs, valueArg) {
				var commandArr = commandWithArgs.split(' '),
					command = commandArr.shift(),
					args = commandArr.join(' ') + (valueArg || '')
				if (command === 'indent')	{
					indentCommand(window.getSelection())
				} else if (command === 'outdent') {
					outdentCommand(window.getSelection())
				} else {
					document.execCommand(command, 0, args)
				}
				updateToolbar()
			},
			bindHotkeys = function (hotKeys) {
				$.each(hotKeys, function (hotkey, command) {
					editor.keydown(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault()
							e.stopPropagation()
							execCommand(command)
						}
					}).keyup(hotkey, function (e) {
						if (editor.attr('contenteditable') && editor.is(':visible')) {
							e.preventDefault()
							e.stopPropagation()
						}
					})
				})
			},
			getCurrentRange = function () {
				var sel = window.getSelection()
				if (sel.getRangeAt && sel.rangeCount) {
					return sel.getRangeAt(0)
				}
			},
			saveSelection = function () {
				selectedRange = getCurrentRange()
			},
			restoreSelection = function () {
				var selection = window.getSelection()
				if (selectedRange) {
					try {
						selection.removeAllRanges()
					} catch (ex) {
						document.body.createTextRange().select()
						document.selection.empty()
					}

					selection.addRange(selectedRange)
				}
			},
			insertFiles = function (files) {
				editor.focus()
				$.each(files, function (idx, fileInfo) {
					if (/^image\//.test(fileInfo.type)) {
						$.when(readFileIntoDataUrl(fileInfo)).done(function (dataUrl) {
							// execCommand('insertimage', dataUrl)
							insertImageCommand(window.getSelection(), dataUrl)
						}).fail(function (e) {
							options.fileUploadError('file-reader', e)
						})
					} else {
						options.fileUploadError('unsupported-file-type', fileInfo.type)
					}
				})
			},
			markSelection = function (input, color) {
				restoreSelection()
				if (document.queryCommandSupported('hiliteColor')) {
					document.execCommand('hiliteColor', 0, color || 'transparent')
				}
				saveSelection()
				input.data(options.selectionMarker, color)
			},
			bindToolbar = function (toolbar, options) {
				toolbar.find(toolbarBtnSelector).click(function () {
					restoreSelection()
					editor.focus()
					execCommand($(this).data(options.commandRole))
					saveSelection()
				})
				toolbar.find('[data-toggle=dropdown]').click(restoreSelection)

				toolbar.find('input[type=text][data-' + options.commandRole + ']').on('webkitspeechchange change', function () {
					var newValue = this.value /* ugly but prevents fake double-calls due to selection restoration */
					this.value = ''
					restoreSelection()
					if (newValue) {
						editor.focus()
						execCommand($(this).data(options.commandRole), newValue)
					}
					saveSelection()
				}).on('focus', function () {
					var input = $(this)
					if (!input.data(options.selectionMarker)) {
						markSelection(input, options.selectionColor)
						input.focus()
					}
				}).on('blur', function () {
					var input = $(this)
					if (input.data(options.selectionMarker)) {
						markSelection(input, false)
					}
				})
				toolbar.find('input[type=file][data-' + options.commandRole + ']').change(function () {
					restoreSelection()
					if (this.type === 'file' && this.files && this.files.length > 0) {
						insertFiles(this.files)
					}
					saveSelection()
					this.value = ''
				})
			},
			initFileDrops = function () {
				editor.on('dragenter dragover', false)
					.on('drop', function (e) {
						var dataTransfer = e.originalEvent.dataTransfer
						e.stopPropagation()
						e.preventDefault()
						if (dataTransfer && dataTransfer.files && dataTransfer.files.length > 0) {
							insertFiles(dataTransfer.files)
						}
					})
			}
		options = $.extend({}, $.fn.wysiwyg.defaults, userOptions)
		toolbarBtnSelector = 'a[data-' + options.commandRole + '],button[data-' + options.commandRole + '],input[type=button][data-' + options.commandRole + ']'
		bindHotkeys(options.hotKeys)
		if (options.dragAndDropImages) {
			initFileDrops()
		}
		bindToolbar($(options.toolbarSelector), options)
		editor.attr('contenteditable', true)
			.on('mouseup keyup mouseout', function () {
				saveSelection()
				updateToolbar()
			})
		$(window).bind('touchend', function (e) {
			var isInside = (editor.is(e.target) || editor.has(e.target).length > 0),
				currentRange = getCurrentRange(),
				clear = currentRange && (currentRange.startContainer === currentRange.endContainer && currentRange.startOffset === currentRange.endOffset)
			if (!clear || isInside) {
				saveSelection()
				updateToolbar()
			}
		})
		return this
	}
	$.fn.wysiwyg.defaults = {
		hotKeys: {
			'ctrl+b meta+b': 'bold',
			'ctrl+i meta+i': 'italic',
			'ctrl+u meta+u': 'underline',
			'ctrl+z meta+z': 'undo',
			'ctrl+y meta+y meta+shift+z': 'redo',
			// 'ctrl+l meta+l': 'justifyleft',
			// 'ctrl+r meta+r': 'justifyright',
			// 'ctrl+e meta+e': 'justifycenter',
			// 'ctrl+j meta+j': 'justifyfull',
			'shift+tab': 'outdent',
			'tab': 'indent'
		},
		toolbarSelector: '[data-role=editor-toolbar]',
		commandRole: 'edit',
		activeToolbarClass: 'btn-info',
		selectionMarker: 'edit-focus-marker',
		selectionColor: 'darkgrey',
		dragAndDropImages: true,
		uploadImageUrl: '/api/upload',
		fileUploadError: function (reason, detail) { console.log('File upload error', reason, detail) }
	}
}
