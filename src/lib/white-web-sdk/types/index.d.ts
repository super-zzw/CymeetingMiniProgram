import { ComponentType, HTMLAttributes, Consumer } from "react";

export { ComponentType, HTMLAttributes, Consumer } from "react";

export declare const WhiteVersion: string;

export declare const AkkoVersion: any;

export declare type Event = {
    event: string;
    payload: any;
    authorId: number;
    scope: Scope;
    phase: EventPhase;
};

export declare enum EventScope {
    System = 0,
    App = 1,
    Custom = 2,
    Magix = 3,
}

export declare enum EventPhase {
    Dispatched = "dispatched",
    Updated = "updated",
    Canceled = "canceled",
}

export declare type ReconnectionOptions = {
    disableReconnect: boolean;
};

export declare type Level = "debug" | "info" | "warn" | "error";

export declare enum DeviceType {
    Desktop = "desktop",
    Touch = "touch",
    Surface = "surface",
}

export declare type Camera = {
    centerX: number;
    centerY: number;
    scale: number;
};

export declare type Rectangle = Size & {
    originX: number;
    originY: number;
};

export declare type Size = {
    width: number;
    height: number;
};

export declare enum AnimationMode {
    Continuous = "continuous",
    Immediately = "immediately",
}

export declare type WrappedComponents = ReadonlyArray<ComponentType<{
}>>;

export declare const CNode: ComponentType<CNodeProps>;

export declare type CNodeProps = HTMLAttributes<HTMLDivElement> & {
    context?: any;
    fixedMode?: boolean;
    onRef?: (element: HTMLDivElement | null)=>void;
};

export declare type UserFonts = {
    [font: string]: string;
};

export declare interface Cursor {
    readonly divElement: HTMLDivElement;

    readonly memberId: number;

    readonly cursorMember: CursorMember;

    readonly x: number;

    readonly y: number;

    readonly width: number;

    readonly height: number;

    onCursorMemberChanged: (cursorMember: CursorMember)=>void;

    setReactNode(reactNode: any): void;

    setCursorDescription(description: Partial<CursorDescription>): void;

}

export declare interface CursorMember {
    readonly color: Color;

    readonly appliance: string;

    readonly information: MemberInformation;

}

export declare interface CursorAdapter {
    createCursor(memberId: number): CursorDescription & {
        reactNode?: any;
    };

    readonly onAddedCursor: ((cursor: Cursor)=>void) | undefined;

    readonly onRemovedCursor: ((cursor: Cursor)=>void) | undefined;

    readonly onMovingCursor: ((cursor: Cursor, positionX: number, positionY: number)=>void) | undefined;

}

export declare type CursorDescription = {
    x: number;
    y: number;
    width: number;
    height: number;
};

export declare type FloatBarOptions = {
    colors: ReadonlyArray<Readonly<Color>>;
};

export declare function createPlugins<C_MAP extends Object>(plugins: Readonly<{
    [K: string]: Plugin<any>;
}>): Plugins<C_MAP>;

export declare type Plugin<C = {
}, T = any> = {
    kind?: string;
    render: ComponentType<PluginProps<C, T>>;
    defaultAttributes?: T;
    hitTest?: (plugin: PluginInstance<C, T>, x: number, y: number, selectorRadius: number)=>boolean;
    willInterruptEvent?: (plugin: PluginInstance<C, T>, event: NativeEvent)=>boolean;
};

export declare interface Plugins<C_MAP extends Object = {
    [kind: string]: any;
}> {
    readonly plugins: Readonly<{
        [K: string]: RenderPlugin<any>;
    }>;

    setPluginContext<K extends string>(kind: K, context: any): void;

    getPluginContext<K extends string>(kind: K): any | undefined;

}

export declare abstract class InvisiblePlugin<A extends Object> {
    readonly displayer: Displayer;

    readonly callbacks: Callbacks<InvisibleCallbacks<A>>;

    readonly attributes: A;

    constructor(context: InvisiblePluginContext);

    onAttributesUpdate(attributes: A): void;

    onDestroy(): void;

    setAttributes(modifyAttributes: Partial<A>): void;

    destroy(): void;

    _dispose(shouldCallback: boolean): void;

    private kind: any;

    private _displayer: any;

    private _callbacks: any;

    private enableCallbackUpdate: any;

    private disposer: any;

    private autorunAttributesUpdate: any;

}

export declare type InvisiblePluginContext = {
    kind: string;
    displayer: Displayer;
};

export declare type InvisiblePluginClass<K extends string, A extends Object, P extends InvisiblePlugin<A> = InvisiblePlugin<A>> = {
    kind: K;
    onCreate?: (plugin: P)=>void;
    onDestroy?: (plugin: P)=>void;
};

export declare type InvisibleCallbacks<A extends Object> = {
    onAttributesUpdate: (attributes: A)=>void;
    onDestroy: ()=>void;
};

export declare type LoggerOptions = {
    disableReportLog?: boolean;
    reportLevelMask?: Level;
    printLevelMask?: Level;
};

export declare function setAsyncModuleLoadMode(mode: AsyncModuleLoadMode): void;

export declare enum AsyncModuleLoadMode {
    DisableCache = "disableCache",
    StoreAsBlob = "storeAsBlob",
    StoreAsBase64 = "storeAsBase64",
}

export declare enum ViewMode {
    Freedom = "freedom",
    Follower = "follower",
    Broadcaster = "broadcaster",
}

export declare enum RenderEngine {
    SVG = "svg",
    Canvas = "canvas",
}

export declare function isRoom(displayer: Displayer): boolean;

export declare function isPlayer(displayer: Displayer): boolean;

export declare interface Callbacks<CALLBACKS> {
    on<NAME extends string>(name: NAME, listener: any): void;

    once<NAME extends string>(name: NAME, listener: any): void;

    off<NAME extends string>(name?: NAME, listener?: any): void;

}

export declare const DefaultHotKeys: Partial<HotKeys>;

export declare type HotKeys = {
    duplicate: HotKey;
    copy: HotKey;
    paste: HotKey;
    undo: HotKey;
    redo: HotKey;
    delete: HotKey;
    lock: HotKey;
    changeToSelector: HotKey;
    changeToLaserPointer: HotKey;
    changeToPencil: HotKey;
    changeToRectangle: HotKey;
    changeToEllipse: HotKey;
    changeToEraser: HotKey;
    changeToStraight: HotKey;
    changeToArrow: HotKey;
    changeToHand: HotKey;
};

export declare type HotKey = string | HotKeyDescription | ReadonlyArray<string | HotKeyDescription> | HotKeyChecker;

export declare type HotKeyDescription = {
    key: string;
    altKey: boolean | null;
    ctrlKey: boolean | null;
    shiftKey: boolean | null;
};

export declare type HotKeyEvent = {
    nativeEvent?: KeyboardEvent;
    kind: "KeyDown" | "KeyUp";
    key: string;
    altKey: boolean;
    ctrlKey: boolean;
    shiftKey: boolean;
};

export declare type HotKeyChecker = (event: HotKeyEvent, kind: KeyboardKind)=>boolean;

export declare function createPPTTask(params: PPTTaskParams): PPTTask;

export declare type PPT = {
    uuid: string;
    kind: PPTKind;
    width: number;
    height: number;
    scenes: ReadonlyArray<SceneDefinition>;
};

export declare interface PPTTask {
    readonly uuid: string;

    readonly kind: PPTKind;

    readonly callbacks: Callbacks<PPTTaskCallbacks>;

    checkUtilGet(): Promise<PPT>;

}

export declare enum PPTKind {
    Dynamic = "dynamic",
    Static = "static",
}

export declare enum PPTTaskStatus {
    Waiting = "Waiting",
    Converting = "Converting",
}

export declare enum PPTTaskStep {
    Extracting = "Extracting",
    Packaging = "Packaging",
    GeneratingPreview = "GeneratingPreview",
    MediaTranscode = "MediaTranscode",
}

export declare type PPTTaskProgress = {
    status: PPTTaskStatus;
    currentStep?: PPTTaskStep;
    totalPageSize: number;
    convertedPageSize: number;
    convertedPercentage: number;
};

export declare type PPTTaskParams = {
    uuid: string;
    region?: string;
    kind: PPTKind;
    taskToken: string;
    checkProgressInterval?: number;
    checkProgressTimeout?: number;
    callbacks?: PPTTaskCallbacks;
};

export declare type PPTTaskCallbacks = {
    onProgressUpdated: (progress: PPTTaskProgress)=>void;
    onTaskSuccess: (result: PPT)=>void;
    onTaskFail: (error: Error)=>void;
};

export declare interface LegacyPPTConverter {
    convert(params: LegacyPPTConvertParams): Promise<LegacyPPT>;

}

export declare type LegacyPPT = {
    uuid: string;
    kind: PPTKind;
    width: number;
    height: number;
    slideURLs: ReadonlyArray<string>;
    scenes: ReadonlyArray<SceneDefinition>;
};

export declare type LegacyPPTConvertParams = {
    url: string;
    kind: PPTKind;
    onProgressUpdated?: (progress: number)=>void;
    checkProgressInterval?: number;
    checkProgressTimeout?: number;
};

export declare function contentModeScale(scale: number): ContentMode;

export declare function contentModeAspectFit(): ContentMode;

export declare function contentModeAspectFitScale(scale: number): ContentMode;

export declare function contentModeAspectFitSpace(space: number): ContentMode;

export declare function contentModeAspectFill(): ContentMode;

export declare function contentModeAspectFillScale(scale: number): ContentMode;

export declare type CameraBound = {
    damping?: number;
    centerX?: number;
    centerY?: number;
    width?: number;
    height?: number;
    maxContentMode?: ContentMode;
    minContentMode?: ContentMode;
};

export declare type ContentMode = (screenSize: Size, boundSize: Size)=>number;

export declare enum ScenePathType {
    None = "none",
    Dir = "dir",
    Page = "page",
}

export declare type SceneMap = {
    [dirPath: string]: WhiteScene[];
};

export declare interface Displayer<CALLBACKS extends DisplayerCallbacks = DisplayerCallbacks> {
    readonly callbacks: Callbacks<CALLBACKS>;

    readonly observerId: number;

    readonly region: string;

    readonly slice: string;

    readonly deviceType: DeviceType;

    readonly screenType: ScreenType;

    readonly state: DisplayerState;

    readonly enableWriteNow: boolean;

    readonly handToolKey: string | undefined;

    handToolActive: boolean;

    disableCameraTransform: boolean;

    refreshViewSize(): void;

    setCameraBound(cameraBound: CameraBound): void;

    memberState(memberId: number): MemberState;

    moveCamera(camera: Partial<Camera> & Readonly<{
        animationMode?: AnimationMode;
    }>): void;

    moveCameraToContain(rectangle: Rectangle & Readonly<{
        animationMode?: AnimationMode;
    }>): void;

    bindHtmlElement(element: HTMLDivElement | null): void;

    getInvisiblePlugin<A extends Object>(kind: string): InvisiblePlugin<A> | null;

    convertToPointInWorld(point: {
        x: number;
        y: number;
    }): {
        x: number;
        y: number;
    };

    scenePreview(scenePath: string, div: HTMLElement, width: number | undefined, height: number | undefined): void;

    generateScreenshot(scenePath?: string, width?: number, height?: number): Promise<string>;

    fillSceneSnapshot(scenePath: string, div: HTMLElement, width: number, height: number): void;

    addMagixEventListener(event: string, listener: EventListener): void;

    addMagixEventListener(event: string, listener: EventsListener, fireInterval: number): void;

    removeMagixEventListener(event: string, listener?: EventListener): void;

    waitMagixEvent(filter: EventFilter): Promise<Event>;

    scalePptToFit(animationMode?: AnimationMode): void;

    scenePathType(path: string): ScenePathType;

    entireScenes(): SceneMap;

}

export declare type DisplayerState = {
    globalState: GlobalState;
    roomMembers: ReadonlyArray<RoomMember>;
    sceneState: SceneState;
    cameraState: CameraState;
};

export declare type DisplayerCallbacks = {
    onEnableWriteNowChanged: (enableWriteNow: boolean)=>void;
    onHandToolActive: (active: boolean)=>void;
    onSliceChanged: (slice: string)=>void;
    onCatchErrorWhenAppendFrame: (userId: number, error: Error)=>void;
    onCatchErrorWhenRender: (error: Error)=>void;
    onPPTLoadProgress: (uuid: string, progress: number)=>void;
    onPPTMediaPlay: (shapeId: string, type: MediaType)=>void;
    onPPTMediaPause: (shapeId: string, type: MediaType)=>void;
};

export declare interface Room extends Displayer {
    readonly uuid: string;

    readonly session: string;

    readonly roomToken: string;

    readonly phase: RoomPhase;

    readonly state: RoomState;

    readonly isWritable: boolean;

    readonly canUndoSteps: number;

    readonly canRedoSteps: number;

    disableDeviceInputs: boolean;

    disableEraseImage: boolean;

    disableSerialization: boolean;

    timeDelay: number;

    setWritable(isWritable: boolean): Promise<void>;

    setGlobalState(modifyState: Partial<GlobalState>): GlobalState;

    setMemberState(modifyState: Partial<MemberState>): MemberState;

    setViewMode(viewMode: ViewMode): void;

    setScenePath(scenePath: string): void;

    setSceneIndex(index: number): void;

    dispatchMagixEvent(event: string, payload: any): void;

    putScenes(path: string, scenes: ReadonlyArray<SceneDefinition>, index?: number): void;

    cleanCurrentScene(retainPpt?: boolean): void;

    removeScenes(path: string): void;

    moveScene(originalPath: string, targetPath: string): void;

    insertImage(imageInfo: ImageInformation): void;

    lockImage(uuid: string, locked: boolean): void;

    completeImageUpload(uuid: string, src: string): void;

    createInvisiblePlugin<K extends string, A extends Object, P extends InvisiblePlugin<A>>(pluginClass: InvisiblePluginClass<K, A, P>, attributes: A): Promise<InvisiblePlugin<A>>;

    insertPlugin(kind: string, description?: PluginDescription): Identifier;

    removePlugin(identifier: Identifier): boolean;

    updatePlugin(identifier: Identifier, description: PluginDescription): boolean;

    getPluginAttributes(identifier: Identifier): any | undefined;

    getPluginRectangle(identifier: string): Rectangle | undefined;

    duplicate(): void;

    copy(): void;

    paste(): void;

    undo(): number;

    redo(): number;

    delete(): void;

    pptNextStep(): void;

    pptPreviousStep(): void;

    disconnect(): Promise<void>;

}

export declare enum RoomPhase {
    Connecting = "connecting",
    Connected = "connected",
    Reconnecting = "reconnecting",
    Disconnecting = "disconnecting",
    Disconnected = "disconnected",
}

export declare enum RoomErrorLevel {
    ThrowError = "throwError",
    Warn = "warn",
    Ignore = "ignore",
}

export declare type RoomCallbacks = DisplayerCallbacks & {
    onPhaseChanged: (phase: RoomPhase)=>void;
    onRoomStateChanged: (modifyState: Partial<RoomState>)=>void;
    onDisconnectWithError: (error: Error)=>void;
    onKickedWithReason: (reason: string)=>void;
    onCanUndoStepsUpdate: (canUndoSteps: number)=>void;
    onCanRedoStepsUpdate: (canUndoSteps: number)=>void;
    willInterceptKeyboardEvent: (event: KeyboardEvent)=>boolean;
    onKeyDown: (event: KeyboardEvent)=>void;
    onKeyUp: (event: KeyboardEvent)=>void;
};

export declare type SceneDefinition = {
    name?: string;
    ppt?: PptDescription;
};

export declare interface Player extends Displayer {
    readonly roomUUID: string;

    readonly slice: string;

    readonly isPlayable: boolean;

    readonly phase: PlayerPhase;

    readonly state: PlayerState;

    readonly progressTime: number;

    readonly timeDuration: number;

    readonly framesCount: number;

    readonly beginTimestamp: number;

    playbackSpeed: number;

    readonly scheduleTime: number;

    play(): void;

    pause(): void;

    stop(): void;

    seekToProgressTime(progressTime: number): void;

    setObserverMode(observerMode: ObserverMode): void;

    seekToScheduleTime(scheduleTime: number): void;

}

export declare enum PlayerPhase {
    WaitingFirstFrame = "waitingFirstFrame",
    Playing = "playing",
    Pause = "pause",
    Stopped = "stop",
    Ended = "ended",
    Buffering = "buffering",
}

export declare type PlayerState = DisplayerState & {
    observerMode: ObserverMode;
};

export declare type PlayerCallbacks = DisplayerCallbacks & {
    onIsPlayableChanged: (isPlayable: boolean)=>void;
    onPhaseChanged: (phase: PlayerPhase)=>void;
    onLoadFirstFrame: ()=>void;
    onPlayerStateChanged: (modifyState: Partial<PlayerState>)=>void;
    onStoppedWithError: (error: Error)=>void;
    onProgressTimeChanged: (progressTimestamp: number)=>void;
};

export declare type BroadcastState = {
    mode: ViewMode;
    broadcasterId?: number;
    broadcasterInformation?: MemberInformation;
};

export declare enum ObserverMode {
    Directory = "directory",
    Freedom = "freedom",
}

export declare type RoomMember = {
    memberId: number;
    memberState: MemberState;
    session: string;
    payload: any;
};

export declare type RoomState = DisplayerState & {
    memberState: MemberState;
    broadcastState: Readonly<BroadcastState>;
    zoomScale: number;
};

export declare type SceneState = {
    scenes: ReadonlyArray<WhiteScene>;
    scenePath: string;
    sceneName: string;
    contextPath: string;
    index: number;
};

export declare const DisplayerConsumer: Consumer<Displayer>;

export declare const RoomConsumer: Consumer<Room | undefined>;

export declare const PlayerConsumer: Consumer<Player | undefined>;

export declare type MemberState = {
    currentApplianceName: ApplianceNames;
    strokeColor: Color;
    strokeWidth: number;
    textSize: number;
    pencilOptions: PencilOptions;
};

export declare enum ApplianceNames {
    selector = "selector",
    laserPointer = "laserPointer",
    pencil = "pencil",
    rectangle = "rectangle",
    ellipse = "ellipse",
    eraser = "eraser",
    text = "text",
    straight = "straight",
    arrow = "arrow",
    hand = "hand",
}

export declare type PluginProps<C, T> = {
    plugin: PluginInstance<C, T>;
    margin: Margin;
    origin: Point;
    size: Size;
    scale: number;
    cnode?: any;
};

export declare interface PluginInstance<C, A> {
    readonly kind: string;

    readonly identifier: Identifier;

    readonly context: C;

    readonly originX: number;

    readonly originY: number;

    readonly width: number;

    readonly height: number;

    readonly selectable: boolean;

    readonly isDraging: boolean;

    readonly isResizing: boolean;

    readonly isPlaying: boolean;

    readonly playerTimestamp: number;

    readonly playbackSpeed: number;

    attributes: A;

    putAttributes(attributes: Partial<A>): void;

    removeAttributeKeys<K extends string>(...keys: K[]): void;

    update(description: PluginDescription<A>): void;

    remove(): void;

}

export declare type PluginDescription<A = any> = {
    originX?: number;
    originY?: number;
    width?: number;
    height?: number;
    selectable?: boolean;
    attributes?: A;
};

export declare type Color = number[];

export declare type GlobalState = {
};

export declare type PptDescription = {
    src: string;
    width: number;
    height: number;
    previewURL?: string;
};

export declare type ImageInformation = {
    uuid: string;
    centerX: number;
    centerY: number;
    width: number;
    height: number;
    locked: boolean;
};

export declare type WorldViewRectangle = {
    originX: number;
    originY: number;
    width: number;
    height: number;
};

export declare function injectCustomStyle(icons: UserCursorIcons): void;

export declare enum CursorNames {
    Hand = "cursor-hand",
    HandGrasp = "cursor-hand-grasp",
    LaserPointer = "cursor-laserPointer",
    Selector = "cursor-selector",
    Pencil = "cursor-pencil",
    Eraser = "cursor-eraser",
    Rectangle = "cursor-rectangle",
    Ellipse = "cursor-ellipse",
    Straight = "cursor-straight",
    Arrow = "cursor-arrow",
    Text = "cursor-text",
    Nwse = "cursor-nwse",
    Nesw = "cursor-nesw",
    Ns = "cursor-ns",
    Ew = "cursor-ew",
}

export declare enum ScreenType {
    Desktop = "desktop",
    Phone = "phone",
    Pad = "pad",
    TV = "tv",
}

export declare type WhiteWebSdkConfiguration = {
    appIdentifier: string;
    region?: string;
    useMobXState?: boolean;
    deviceType?: DeviceType;
    screenType?: ScreenType;
    renderEngine?: RenderEngine;
    fonts?: UserFonts;
    handToolKey?: string;
    fontFamily?: string;
    preloadDynamicPPT?: boolean;
    loggerOptions?: LoggerOptions;
    reconnectionOptions?: Partial<ReconnectionOptions> | false;
    onlyCallbackRemoteStateModify?: boolean;
    plugins?: Plugins;
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    wrappedComponents?: WrappedComponents;
    pptParams?: PptParams;
    urlInterrupter?: (url: string)=>string;
    onWhiteSetupFailed?: (error: Error)=>void;
};

export declare type JoinRoomParams = {
    uuid: string;
    region?: string;
    roomToken: string;
    userPayload?: any;
    isWritable?: boolean;
    disableDeviceInputs?: boolean;
    disableCameraTransform?: boolean;
    disableBezier?: boolean;
    disableAutoResize?: boolean;
    cursorAdapter?: CursorAdapter;
    cameraBound?: CameraBound;
    disableEraseImage?: boolean;
    floatBar?: boolean | Partial<FloatBarOptions>;
    hotKeys?: Partial<HotKeys>;
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    wrappedComponents?: WrappedComponents;
    rejectWhenReadonlyErrorLevel?: RoomErrorLevel;
};

export declare type ReplayRoomParams = {
    slice?: string;
    room?: string;
    region?: string;
    beginTimestamp?: number;
    duration?: number;
    cursorAdapter?: CursorAdapter;
    cameraBound?: CameraBound;
    disableAutoResize?: boolean;
    disableCameraTransform?: boolean;
    invisiblePlugins?: ReadonlyArray<InvisiblePluginClass<string, any, any>>;
    wrappedComponents?: WrappedComponents;
    roomToken?: string;
};

export declare type PlayableCheckingParams = {
    region?: string;
    room?: string;
    slice?: string;
    beginTimestamp?: number;
    duration?: number;
};

export declare class WhiteWebSdk {
    readonly region: string;

    readonly deviceType: DeviceType;

    readonly screenType: ScreenType;

    readonly renderEngine: RenderEngine;

    constructor(params: WhiteWebSdkConfiguration);

    joinRoom(params: JoinRoomParams, callbacks?: Partial<RoomCallbacks>): Promise<Room>;

    isPlayable(params: PlayableCheckingParams): Promise<boolean>;

    replayRoom(params: ReplayRoomParams, callbacks?: Partial<PlayerCallbacks>): Promise<Player>;

    pptConverter(roomToken: string): LegacyPPTConverter;

    private static netState: any;

    private loggerFactory: any;

    private akkoApp: any;

    private boundless: any;

    private plugins: any;

    private invisiblePlugins: any;

    private wrappedComponents: any;

    private preloadDynamicPPT: any;

    private fonts: any;

    private handToolKey: any;

    private fontFamily: any;

    private useMobXState: any;

    private onlyCallbackRemoteStateModify: any;

    private urlInterrupter: any;

    private pptParams: any;

    private standardizeCameraBound: any;

    private isCanvasRenderEngineAvailable: any;

    private assertAppIdentifier: any;

    private assertPlugins: any;

    private assertInvisiblePlugins: any;

    private isValidInvisiblePluginClass: any;

    private mergeArray: any;

}

export declare enum Scope {
    System = "system",
    App = "app",
    Custom = "custom",
    Magix = "magix",
}

export declare type MemberInformation = {
    id: number;
    nickName: string;
    isOwner: boolean;
    avatar?: string;
};

export declare type NativeEvent = MouseEvent | WheelEvent | KeyboardEvent | TouchEvent;

export declare type RenderPlugin<C = {
}, T = any> = {
    kind: string;
    render: ComponentType<PluginProps<C, T>>;
    defaultAttributes?: T;
    hitTest?: (plugin: PluginInstance<C, T>, x: number, y: number, selectorRadius: number)=>boolean;
    willInterruptEvent?: (plugin: PluginInstance<C, T>, event: NativeEvent)=>boolean;
};

export declare enum KeyboardKind {
    Mac = "mac",
    Windows = "windows",
}

export declare type WhiteScene = {
    name: string;
    componentsCount: number;
    ppt?: PptDescription;
};

export declare type EventListener = (event: Event)=>void;

export declare type EventsListener = (events: Event[])=>void;

export declare type EventFilter = (event: Event)=>boolean;

export declare type CameraState = Camera & {
    width: number;
    height: number;
};

export declare type MediaType = "video" | "audio";

export declare type Identifier = string;

export declare type PencilOptions = {
    enableDrawPoint: boolean;
    disableBezier: boolean;
    sparseWidth: number;
    sparseHump: number;
};

export declare type Margin = {
    top: number;
    bottom: number;
    left: number;
    right: number;
};

export declare type Point = {
    x: number;
    y: number;
};

export declare type UserCursorIcons = {
    [key: string]: ReadonlyArray<string>;
};

export declare type PptParams = {
    scheme?: string;
    rtcClient?: RTCClient;
};

export declare type RTCClient = {
    startAudioMixing: (filePath: string, loopback: boolean, replace: boolean, cycle: number, callback?: (state: number, errorCode: number)=>void)=>number;
    stopAudioMixing: (callback?: (state: number, errorCode: number)=>void)=>number;
    pauseAudioMixing: ()=>number;
    resumeAudioMixing: ()=>number;
    adjustAudioMixingVolume?: (volume: number)=>number;
    adjustAudioMixingPlayoutVolume?: (volume: number)=>number;
    adjustAudioMixingPublishVolume?: (volume: number)=>number;
    getAudioMixingPlayoutVolume?: ()=>number;
    getAudioMixingPublishVolume?: ()=>number;
    getAudioMixingDuration?: ()=>number;
    getAudioMixingCurrentPosition?: ()=>number;
    setAudioMixingPosition: (position: number)=>number;
};


