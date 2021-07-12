/**
 * @description Editor View class
 * @author wangfupeng
 */

// import $, { Dom7Array } from 'dom7'
import { Descendant } from 'slate'
import {
  IDomEditor,
  coreCreateEditor,
  Toolbar,
  coreCreateToolbar,

  // 配置
  IEditorConfig,
  IToolbarConfig,

  // 注册菜单
  IRegisterMenuConf,
  registerMenu,

  // 渲染 modal -> view
  IRenderElemConf,
  RenderTextStyleFnType,
  registerTextStyleHandler,
  registerRenderElemConf,

  // to html
  IElemToHtmlConf,
  TextToHtmlFnType,
  TextStyleToHtmlFnType,
  registerTextStyleToHtmlHandler,
  registerTextToHtmlHandler,
  registerElemToHtmlConf,
} from '@wangeditor/core'
import { DOMElement } from './utils/dom'

type PluginType = <T extends IDomEditor>(editor: T) => T

interface ICreateEditorOption {
  textareaSelector: string | DOMElement
  config?: Partial<IEditorConfig>
  content?: Descendant[]
  mode?: string
}

interface ICreateToolbarOption {
  editor: IDomEditor | null
  toolbarSelector: string | DOMElement
  config?: Partial<IToolbarConfig>
  mode?: string
}

class wangEditor {
  constructor() {
    // v4 的使用方式是 new wangEditor(...) ，v5+ 不再这样使用
    // 正好，在此提示用户，现在是 v4 版本，请参考官网的文档

    let info = '您正在使用 wangEditor v5+ 版本，无法执行 new wangEditor(...) ，'
    info += '请参考官网和开发文档：'
    info += 'https://www.wangeditor.com/'
    info += '\nYou are using wangEditor v5+ version, cannot do `new wangEditor(...)`, '
    info += 'please see our website and documentation: '
    info += 'https://www.wangeditor.com/en.html'
    throw new Error(info)
  }

  // editor 配置
  static editorConfig: Partial<IEditorConfig> = {}
  static setEditorConfig(newConfig: Partial<IEditorConfig> = {}) {
    this.editorConfig = {
      ...this.editorConfig,
      ...newConfig,
    }
  }
  static simpleEditorConfig: Partial<IEditorConfig> = {}
  static setSimpleEditorConfig(newConfig: Partial<IEditorConfig> = {}) {
    this.simpleEditorConfig = {
      ...this.simpleEditorConfig,
      ...newConfig,
    }
  }

  //toolbar 配置
  static toolbarConfig: Partial<IToolbarConfig> = {}
  static setToolbarConfig(newConfig: Partial<IToolbarConfig> = {}) {
    this.toolbarConfig = {
      ...this.toolbarConfig,
      ...newConfig,
    }
  }
  static simpleToolbarConfig: Partial<IToolbarConfig> = {}
  static setSimpleToolbarConfig(newConfig: Partial<IToolbarConfig> = {}) {
    this.simpleToolbarConfig = {
      ...this.simpleToolbarConfig,
      ...newConfig,
    }
  }

  // 注册插件
  static plugins: PluginType[] = []
  static registerPlugin(plugin: PluginType) {
    this.plugins.push(plugin)
  }

  // 注册 menu
  // TODO 可在注册时传入配置，在开发文档中说明
  static registerMenu(menuConf: IRegisterMenuConf, customConfig?: { [key: string]: any }) {
    registerMenu(menuConf, customConfig)
  }

  // 注册 renderElem
  static registerRenderElem(renderElemConf: IRenderElemConf) {
    registerRenderElemConf(renderElemConf)
  }

  // 注册 renderTextStyle
  static registerRenderTextStyle(fn: RenderTextStyleFnType) {
    registerTextStyleHandler(fn)
  }

  // 注册 elemToHtml
  static registerElemToHtml(elemToHtmlConf: IElemToHtmlConf) {
    registerElemToHtmlConf(elemToHtmlConf)
  }

  // 注册 textToHtml
  static registerTextToHtml(fn: TextToHtmlFnType) {
    registerTextToHtmlHandler(fn)
  }

  // 注册 textStyleToHtml
  static registerTextStyleToHtml(fn: TextStyleToHtmlFnType) {
    registerTextStyleToHtmlHandler(fn)
  }

  // -------------------------------------- 分割线 --------------------------------------

  /**
   * 创建 editor 实例
   */
  static createEditor(option: ICreateEditorOption): IDomEditor {
    const { textareaSelector, content = [], config = {}, mode = 'default' } = option
    if (!textareaSelector) {
      throw new Error(`Cannot find 'textareaSelector' when create editor`)
    }

    let globalConfig = mode === 'simple' ? this.simpleEditorConfig : this.editorConfig

    const editor = coreCreateEditor({
      textareaSelector,
      config: {
        ...globalConfig, // 全局配置
        ...config,
      },
      content,
      plugins: this.plugins,
    })

    return editor
  }

  /**
   * 创建 toolbar 实例
   */
  static createToolbar(option: ICreateToolbarOption): Toolbar {
    const { toolbarSelector, editor, config = {}, mode = 'default' } = option
    if (!toolbarSelector) {
      throw new Error(`Cannot find 'toolbarSelector' when create toolbar`)
    }

    let globalConfig = mode === 'simple' ? this.simpleToolbarConfig : this.toolbarConfig

    const toolbar = coreCreateToolbar(editor, {
      toolbarSelector,
      config: {
        ...globalConfig, // 全局配置
        ...config,
      },
    })

    return toolbar
  }
}

export default wangEditor
