import {
  computed,
  defineComponent,
  nextTick,
  onMounted,
  PropType,
  reactive,
  ref,
  watch,
} from "vue";
import "./index.less";

export interface IDefectType {
  defectId: number;
  defectType: string;
  defectDes: string;
  defectLevel: string;
  markColor: string;
  processOpinion: string;
  remark: string;
  editHotkey: string;
  keyCode: string;
}

export interface IDefectDetail {
  label: string;
  value: string;
}

export interface IDefectInfo {
  defectBox: string;
  defectColor: string;
  defectDes: string;
  defectId: string;
  defectName: string;
  defectType: string;
  editHotkey: string;
  defectTypeId: string;
}

export interface IDefectImageInfo {
  shootId: string;
  imageUrl: string;
  infraredImageUrl: string;
}

export const defectProps = () => ({
  defectTypeList: Array<IDefectType>,
  defectDetailList: Array<IDefectDetail>,
  defectInfoList: Array<IDefectInfo>,
  defectImageInfo: Object as PropType<IDefectImageInfo>,
});
const DefectHandal = defineComponent({
  name: "DefectHandal",
  props: defectProps(),
  setup(props, { emit }) {
    // type
    const defectTypeId = ref<number | undefined>(undefined);
    // tool
    enum EToolImage {
      HANDAL,
      CHOOSE,
      DRAG,
      ZOOM,
    }
    enum EToolLayer {
      SINGLE,
      DOUBLE,
    }
    type TToolImage = keyof typeof EToolImage;
    type TToolLayer = keyof typeof EToolLayer;
    const toolState = reactive<{
      image: number | undefined;
      layer: number | undefined;
      handalColor: string;
    }>({
      image: undefined,
      layer: 0,
      handalColor: "",
    });
    const toolImageHandal = (state: TToolImage) => {
      toolState.image = EToolImage[state];
      if (state === "HANDAL") {
        defectTypeId.value = props.defectTypeList?.map((item) => {
          return item.defectId;
        })[0];
      }
      cancleHandle();
    };

    const showImageTips = (e: any, state: TToolImage) => {
      let text = "";
      switch (state) {
        case "HANDAL":
          text = "添加标注/Ctrl + A";
          break;
        case "CHOOSE":
          text = "选中标注(编辑删除)/Ctrl + E";
          break;
        case "DRAG":
          text = "拖拽图片/Ctrl + D";
          break;
        case "ZOOM":
          text = "放大图片/Ctrl + Z";
          break;
        default:
          break;
      }
      tipState.positionX = e.clientX + 20;
      tipState.positionY = e.clientY - 20;
      tipState.tipInfo = text;
      tipState.tipStatus = true;
    };

    const toolLayerHandal = (state: TToolLayer) => {
      toolState.layer = EToolLayer[state];
    };

    const showLayerTips = (e: any, state: TToolLayer) => {
      let text = "";
      switch (state) {
        case "SINGLE":
          text = "一宫格/Ctrl + 1";
          break;
        case "DOUBLE":
          text = "二宫格/Ctrl + 2";
          break;
        default:
          break;
      }
      tipState.positionX = e.clientX + 20;
      tipState.positionY = e.clientY - 20;
      tipState.tipInfo = text;
      tipState.tipStatus = true;
    };

    const resetLayer = () => {
      nextTick(() => {
        const width = document.querySelector(
          ".defect-handle-cont-one"
        )?.clientWidth;
        const height = document.querySelector(
          ".defect-handle-cont-one"
        )?.clientHeight;
        stageSingleRef.value.getNode().width(width);
        stageSingleRef.value.getNode().height(height);
        if (toolState.layer === EToolLayer.DOUBLE) {
          const widthD = document.querySelector(
            ".defect-handle-cont-two"
          )?.clientWidth;
          const heightD = document.querySelector(
            ".defect-handle-cont-two"
          )?.clientHeight;
          stageDoubleRef.value.getNode().width(widthD);
          stageDoubleRef.value.getNode().height(heightD);
        }
      });
      resetImage();
    };

    const resetImage = () => {
      imageSingle.value.src = props.defectImageInfo?.imageUrl as string;
      imageSingle.value.onload = () => {
        const handleContSingleWidth = document.querySelector(
          ".defect-handle-cont-one"
        )?.clientWidth as number;
        const handleContSingleHeight = document.querySelector(
          ".defect-handle-cont-one"
        )?.clientHeight as number;
        configSingleGroup.scaleX =
          handleContSingleWidth / imageSingle.value.width - 0.05;
        configSingleGroup.scaleY = configSingleGroup.scaleX;
        groupSingleRef.value.getNode().scaleX(configSingleGroup.scaleX);
        groupSingleRef.value.getNode().scaleY(configSingleGroup.scaleX);
        groupSingleRef.value
          .getNode()
          .x(
            (handleContSingleWidth -
              imageSingle.value.width * configSingleGroup.scaleX) /
              2
          );
        groupSingleRef.value
          .getNode()
          .y(
            (handleContSingleHeight -
              imageSingle.value.height * configSingleGroup.scaleY) /
              2
          );
        adaptationImages();
      };
      if (toolState.layer === EToolLayer.DOUBLE) {
        imageDouble.value.src = props.defectImageInfo
          ?.infraredImageUrl as string;
        imageDouble.value.onload = () => {
          const handleContDoubleWidth = document.querySelector(
            ".defect-handle-cont-two"
          )?.clientWidth as number;
          const handleContDoubleHeight = document.querySelector(
            ".defect-handle-cont-two"
          )?.clientHeight as number;
          configDoubleGroup.scaleX =
            handleContDoubleWidth / imageDouble.value.width - 0.01;
          configDoubleGroup.scaleY = configDoubleGroup.scaleX;
          groupDoubleRef.value.getNode().scaleX(configDoubleGroup.scaleX);
          groupDoubleRef.value.getNode().scaleY(configDoubleGroup.scaleX);
          groupDoubleRef.value
            .getNode()
            .x(
              (handleContDoubleWidth -
                imageDouble.value.width * configDoubleGroup.scaleX) /
                2
            );
          groupDoubleRef.value
            .getNode()
            .y(
              (handleContDoubleHeight -
                imageDouble.value.height * configDoubleGroup.scaleY) /
                2
            );
          adaptationImages();
        };
      }
    };

    const changeDefectType = (item: IDefectType) => {
      defectTypeId.value = item.defectId;
    };

    // handal
    interface IRecsInfo {
      width: number;
      height: number;
      x: number;
      y: number;
      color: string;
      id: number | undefined;
      name: string;
      defectType: number;
    }

    const handalState = reactive({
      toolStatus: false,
      typeStates: false,
    });

    const tipState = reactive<{
      positionX: number;
      positionY: number;
      tipStatus: boolean;
      tipInfo: JSX.Element | string;
    }>({
      positionX: 0,
      positionY: 0,
      tipStatus: false,
      tipInfo: "",
    });

    const handalWidth = computed(() => {
      let target = "";
      if (handalState.toolStatus && handalState.typeStates) {
        target = "68%";
      } else if (!handalState.toolStatus && handalState.typeStates) {
        target = "70%";
      } else if (handalState.toolStatus && !handalState.typeStates) {
        target = "79%";
      } else if (!handalState.toolStatus && !handalState.typeStates) {
        target = "83%";
      }
      return target;
    });

    const stageSingleRef = ref();
    const layerSingleRef = ref();
    const groupSingleRef = ref();
    const imageSingle = ref(new window.Image());
    const transformerRef = ref();
    const stageDoubleRef = ref();
    const layerDoubleRef = ref();
    const groupDoubleRef = ref();
    const imageDouble = ref(new window.Image());

    const configSingleGroup = reactive({
      name: "layerSingleImage",
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0,
    });

    const configDoubleGroup = reactive({
      name: "layerDoubleImage",
      x: 0,
      y: 0,
      scaleX: 1,
      scaleY: 1,
      offsetX: 0,
      offsetY: 0,
    });

    const scaleSingleConfig = reactive({
      scaleBy: 1.08,
    });

    const scaleDoubleConfig = reactive({
      scaleBy: 1.08,
    });

    const defectSingleRecs = ref<IRecsInfo[]>([]);
    const drawline = ref<any[]>([]);
    const drawStatus = ref<boolean>(false);
    const configTransformer = reactive<{
      selectedNode: any;
      selectedDefectId: number | undefined;
    }>({
      selectedNode: null,
      selectedDefectId: undefined,
    });

    const changeToolStatus = () => {
      handalState.toolStatus = !handalState.toolStatus;
      resetLayer();
    };

    const changeTypeStatus = () => {
      handalState.typeStates = !handalState.typeStates;
      resetLayer();
    };

    const adaptationImages = () => {
      nextTick(() => {
        groupSingleRef.value.getStage().children.forEach((item: any) => {
          if (item.children) {
            item.children.forEach((cItem: any) => {
              if (cItem.attrs.fontSize) {
                cItem.fontSize(15 / configSingleGroup.scaleX);
                cItem.offsetY(15 / configSingleGroup.scaleX);
              }
              if (cItem.attrs.strokeWidth) {
                cItem.strokeWidth(2 / configSingleGroup.scaleX);
              }
            });
          }
        });
        if (toolState.layer === EToolLayer.DOUBLE) {
          groupDoubleRef.value.getStage().children.forEach((item: any) => {
            if (item.children) {
              item.children.forEach((cItem: any) => {
                if (cItem.attrs.fontSize) {
                  cItem.fontSize(15 / configDoubleGroup.scaleX);
                  cItem.offsetY(15 / configDoubleGroup.scaleX);
                }
                if (cItem.attrs.strokeWidth) {
                  cItem.strokeWidth(2 / configDoubleGroup.scaleX);
                }
              });
            }
          });
        }
      });
    };

    const wheelForScale = (e: any) => {
      if (e.evt.deltaY < 0) {
        configSingleGroup.scaleX =
          configSingleGroup.scaleX * scaleSingleConfig.scaleBy;
        configSingleGroup.scaleY =
          configSingleGroup.scaleY * scaleSingleConfig.scaleBy;
      } else {
        configSingleGroup.scaleX =
          configSingleGroup.scaleX / scaleSingleConfig.scaleBy;
        configSingleGroup.scaleY =
          configSingleGroup.scaleY / scaleSingleConfig.scaleBy;
      }
      adaptationImages();
    };

    const wheelForDoubleScale = (e: any) => {
      if (e.evt.deltaY < 0) {
        configDoubleGroup.scaleX =
          configDoubleGroup.scaleX * scaleDoubleConfig.scaleBy;
        configDoubleGroup.scaleY =
          configDoubleGroup.scaleY * scaleDoubleConfig.scaleBy;
      } else {
        configDoubleGroup.scaleX =
          configDoubleGroup.scaleX / scaleDoubleConfig.scaleBy;
        configDoubleGroup.scaleY =
          configDoubleGroup.scaleY / scaleDoubleConfig.scaleBy;
      }
      adaptationImages();
    };

    const updateTransformer = () => {
      const transformerNode = transformerRef.value.getStage();
      if (configTransformer.selectedNode) {
        transformerNode.nodes([configTransformer.selectedNode]);
      } else {
        transformerNode.nodes([]);
      }
    };

    const handleMouseDown = (e: any) => {
      if (toolState.image === EToolImage.DRAG) return;
      const clickedOnTransformer =
        e.target.getParent().className === "Transformer";
      if (clickedOnTransformer) {
        return;
      }
      if (toolState.image === EToolImage.CHOOSE && e.target.attrs.id) {
        configTransformer.selectedDefectId = e.target.attrs.id;
        configTransformer.selectedNode = e.target;
        const editInfo = defectSingleRecs.value?.find((item) => {
          return item.id === e.target.attrs.id;
        });
        defectTypeId.value = editInfo?.defectType;
        e.target.moveToTop();
      } else {
        configTransformer.selectedNode = null;
        configTransformer.selectedDefectId = undefined;
      }
      updateTransformer();
      if (toolState.image === EToolImage.HANDAL) {
        configTransformer.selectedDefectId = undefined;
        configTransformer.selectedNode = null;
        updateTransformer();
        drawStatus.value = true;
        if (
          props.defectInfoList &&
          props.defectInfoList.length < defectSingleRecs.value.length
        ) {
          defectSingleRecs.value.pop();
        }
        const pos = stageSingleRef.value.getNode().getPointerPosition();
        const groupX = groupSingleRef.value.getNode().attrs.x;
        const groupY = groupSingleRef.value.getNode().attrs.y;
        drawline.value = [{ points: [pos.x, pos.y] }];
        defectSingleRecs.value.push({
          width: 0,
          height: 0,
          x:
            pos.x / configSingleGroup.scaleX -
            groupX / configSingleGroup.scaleX,
          y:
            pos.y / configSingleGroup.scaleY -
            groupY / configSingleGroup.scaleY,
          color: props.defectTypeList?.find(
            (ele) => ele.defectId === defectTypeId.value
          )?.markColor as string,
          name: props.defectTypeList?.find(
            (ele) => ele.defectId === defectTypeId.value
          )?.defectDes as string,
          id: undefined,
          defectType: defectTypeId.value as number,
        });
        adaptationImages();
      }
      if (toolState.image === EToolImage.ZOOM) {
        configSingleGroup.scaleX =
          configSingleGroup.scaleX * scaleSingleConfig.scaleBy;
        configSingleGroup.scaleY =
          configSingleGroup.scaleY * scaleSingleConfig.scaleBy;
        adaptationImages();
      }
    };

    const handleMouseDownDouble = (e: any) => {
      if (toolState.image === EToolImage.ZOOM) {
        configDoubleGroup.scaleX =
          configDoubleGroup.scaleX * scaleDoubleConfig.scaleBy;
        configDoubleGroup.scaleY =
          configDoubleGroup.scaleY * scaleDoubleConfig.scaleBy;
        adaptationImages();
      }
    };

    const handleMouseUp = (e: any) => {
      if (toolState.image === EToolImage.DRAG) return;
      if (toolState.image === EToolImage.CHOOSE) {
        if (configTransformer.selectedDefectId) {
          const point = stageSingleRef.value.getNode().getPointerPosition();
          const groupX = groupSingleRef.value.getNode().attrs.x;
          const groupY = groupSingleRef.value.getNode().attrs.y;
          defectSingleRecs.value.forEach((item) => {
            if (item.id === configTransformer.selectedDefectId) {
              item.x =
                transformerRef.value.getNode().x() / configSingleGroup.scaleX -
                groupX;
              item.y =
                transformerRef.value.getNode().y() / configSingleGroup.scaleY -
                groupY;
            }
          });
          tipState.tipInfo = (
            <div>
              <button class="defect-tip-btn" onClick={okHandle}>
                确定
              </button>
              <button
                class="defect-tip-btn"
                style={{ marginLeft: "5px" }}
                onClick={cancleHandle}
              >
                取消
              </button>
            </div>
          );
          tipState.positionX =
            e.target.attrs.x +
            e.target.attrs.width +
            document
              .querySelector(".defect-handle-cont-one")
              ?.getBoundingClientRect().left +
            10;
          tipState.positionY =
            e.target.attrs.y +
            e.target.attrs.height +
            document
              .querySelector(".defect-handle-cont-one")
              ?.getBoundingClientRect().top -
            32;
          tipState.tipStatus = true;
        }
      }
      if (toolState.image === EToolImage.HANDAL) {
        tipState.tipInfo = (
          <div>
            <button class="defect-tip-btn" onClick={okHandle}>
              确定
            </button>
            <button
              class="defect-tip-btn"
              style={{ marginLeft: "5px" }}
              onClick={cancleHandle}
            >
              取消
            </button>
          </div>
        );
        tipState.positionX = e.evt.clientX + 10;
        tipState.positionY = e.evt.clientY - 32;
        tipState.tipStatus = true;
      }
      drawStatus.value = false;
    };

    const handleMouseMove = (e: any) => {
      if (toolState.image === EToolImage.DRAG) return;
      if (toolState.image === EToolImage.HANDAL && drawStatus.value) {
        const point = stageSingleRef.value.getNode().getPointerPosition();
        const groupX = groupSingleRef.value.getNode().attrs.x;
        const groupY = groupSingleRef.value.getNode().attrs.y;
        const lastLine = drawline.value[drawline.value.length - 1];
        lastLine.points = lastLine.points.concat([point.x, point.y]);
        drawline.value.splice(drawline.value.length - 1, 1, lastLine);
        drawline.value = drawline.value.concat();
        const curRec =
          defectSingleRecs.value[defectSingleRecs.value.length - 1];
        curRec.width =
          Math.abs(point.x - groupX - curRec.x * configSingleGroup.scaleX) /
          configSingleGroup.scaleX;
        curRec.height =
          Math.abs(point.y - groupY - curRec.y * configSingleGroup.scaleY) /
          configSingleGroup.scaleY;
      }
      adaptationImages();
    };

    const initDefectInfo = () => {
      defectSingleRecs.value = props.defectInfoList?.map((item) => {
        const pos = JSON.parse(item.defectBox);
        return {
          width: pos.w,
          height: pos.h,
          x: pos.x,
          y: pos.y,
          color: item.defectColor,
          name: item.defectDes,
          id: item.defectId.toString(),
          defectType: item.defectTypeId,
        };
      }) as [];
      const obj: { [key: string]: boolean } = {};
      defectInfoRenderList.value = props.defectInfoList?.reduce(
        (item: IDefectInfo[], next) => {
          if (!obj[next.defectTypeId as string]) {
            item.push(next);
            obj[next.defectTypeId as string] = true;
          }
          return item;
        },
        []
      );

      defectInfoIds.value = defectInfoRenderList.value?.map((item) => {
        return item.defectTypeId;
      }) as string[];
    };

    const okHandle = () => {
      if (
        toolState.image === EToolImage.CHOOSE &&
        configTransformer.selectedDefectId
      ) {
        const editInfo = defectSingleRecs.value?.find(
          (ele) => ele.id === configTransformer.selectedDefectId
        );
        emit("edit", editInfo);
      }
      if (toolState.image === EToolImage.HANDAL) {
        const addInfo =
          defectSingleRecs.value[defectSingleRecs.value.length - 1];
        emit("add", addInfo);
      }
      tipState.tipStatus = false;
    };

    const cancleHandle = () => {
      initDefectInfo();
      tipState.tipStatus = false;
    };

    // list
    const defectInfoIds = ref<string[]>([]);

    const defectInfoRenderList = ref<IDefectInfo[] | undefined>([]);

    const changeDefectInfoStatus = (id: string) => {
      if (defectInfoIds.value?.indexOf(id) !== -1) {
        defectInfoIds.value = defectInfoIds.value?.filter((item) => {
          return item !== id;
        });
      } else {
        defectInfoIds.value = defectInfoIds.value.concat([id]);
      }
    };

    watch(
      () => defectTypeId.value,
      (id) => {
        const info = props.defectTypeList?.find((ele) => ele.defectId === id);
        toolState.handalColor = info?.markColor as string;
        if (
          toolState.image === EToolImage.CHOOSE &&
          configTransformer.selectedDefectId
        ) {
          defectSingleRecs.value = defectSingleRecs.value?.map((item) => {
            if (item.id === configTransformer.selectedDefectId) {
              return {
                ...item,
                color: toolState.handalColor,
                defectType: info?.defectId as number,
                name: info?.defectDes as string,
              };
            }
            return item;
          });
        }
      }
    );

    watch(
      () => toolState.layer,
      () => {
        resetLayer();
      }
    );

    watch(
      () => props.defectImageInfo?.imageUrl,
      (value) => {
        resetImage();
      }
    );

    watch(
      () => props.defectInfoList,
      (value) => {
        if (value) {
          initDefectInfo();
        }
      }
    );

    watch(
      () => defectInfoIds.value,
      (value) => {
        defectSingleRecs.value = [];
        defectSingleRecs.value = props.defectInfoList
          ?.filter((item) => {
            return value?.indexOf(item.defectTypeId) !== -1;
          })
          .map((item) => {
            const pos = JSON.parse(item.defectBox);
            return {
              width: pos.w,
              height: pos.h,
              x: pos.x,
              y: pos.y,
              color: item.defectColor,
              name: item.defectDes,
              id: item.defectId.toString(),
              defectType: item.defectTypeId,
            };
          }) as [];
        adaptationImages();
      }
    );

    document.onkeydown = (e) => {
      // keyboard for type
      defectTypeId.value =
        props.defectTypeList?.find((ele) => Number(ele.keyCode) === e.keyCode)
          ?.defectId ?? defectTypeId.value;
      // keyboard for tool
      if (e.ctrlKey && e.keyCode === 65) {
        // add
        toolImageHandal("HANDAL");
      }
      if (e.ctrlKey && e.keyCode === 69) {
        // edit
        toolImageHandal("CHOOSE");
      }
      if (e.keyCode === 46) {
        // delete
        if (
          toolState.image === EToolImage.CHOOSE &&
          configTransformer.selectedDefectId
        ) {
          emit("delete", configTransformer.selectedDefectId);
        }
      }
      if (e.ctrlKey && e.keyCode === 68) {
        //drag
        toolImageHandal("DRAG");
      }
      if (e.ctrlKey && e.keyCode === 90) {
        //zoom
        toolImageHandal("ZOOM");
      }
      if (e.ctrlKey && e.keyCode === 49) {
        //single
        toolLayerHandal("SINGLE");
      }
      if (e.ctrlKey && e.keyCode === 50) {
        //double
        toolLayerHandal("DOUBLE");
      }
    };

    onMounted(() => {
      initDefectInfo();
      resetLayer();
      resetImage();
    });

    return () => (
      <div class="defect">
        {handalState.typeStates ? (
          <div class="defect-type common-border">
            <div class="defect-title">缺陷字典与热键列表栏</div>
            {props.defectTypeList?.map((item, index) => {
              return (
                <div
                  class="defect-type-item"
                  key={index}
                  onClick={changeDefectType.bind(this, item)}
                >
                  <div class="defect-type-item-left">
                    <font-awesome-icon
                      icon={["fas", "vector-square"]}
                      style={{ fontSize: "18px", color: item.markColor }}
                    />
                    <span>{`${item.defectType}-${item.defectDes}`}</span>
                  </div>
                  <div class="defect-type-item-right">{item.editHotkey}</div>
                </div>
              );
            })}
          </div>
        ) : null}
        {handalState.toolStatus ? (
          <div class="defect-tool">
            <div class="defect-tool-common defect-tool-image">
              <div
                class="defect-tool-btn"
                onClick={toolImageHandal.bind(this, "HANDAL")}
                onMouseenter={(e) => {
                  showImageTips(e, "HANDAL");
                }}
                onMouseleave={() => {
                  tipState.tipStatus = false;
                }}
              >
                <font-awesome-icon
                  icon={["fas", "vector-square"]}
                  style={{
                    fontSize: "18px",
                    color:
                      toolState.image === EToolImage.HANDAL
                        ? toolState.handalColor
                        : "#969696",
                  }}
                />
              </div>
              <div
                class="defect-tool-btn"
                onClick={toolImageHandal.bind(this, "CHOOSE")}
                onMouseenter={(e) => {
                  showImageTips(e, "CHOOSE");
                }}
                onMouseleave={() => {
                  tipState.tipStatus = false;
                }}
              >
                <font-awesome-icon
                  icon={["fas", "mouse-pointer"]}
                  style={{
                    fontSize: "18px",
                    color:
                      toolState.image === EToolImage.CHOOSE
                        ? "#3377FF"
                        : "#969696",
                  }}
                />
              </div>
              <div
                class="defect-tool-btn"
                onClick={toolImageHandal.bind(this, "DRAG")}
                onMouseenter={(e) => {
                  showImageTips(e, "DRAG");
                }}
                onMouseleave={() => {
                  tipState.tipStatus = false;
                }}
              >
                <font-awesome-icon
                  icon={["fas", "hand"]}
                  style={{
                    fontSize: "18px",
                    color:
                      toolState.image === EToolImage.DRAG
                        ? "#3377FF"
                        : "#969696",
                  }}
                />
              </div>
              <div
                class="defect-tool-btn"
                onClick={toolImageHandal.bind(this, "ZOOM")}
                onMouseenter={(e) => {
                  showImageTips(e, "ZOOM");
                }}
                onMouseleave={() => {
                  tipState.tipStatus = false;
                }}
              >
                <font-awesome-icon
                  icon={["fas", "search"]}
                  style={{
                    fontSize: "18px",
                    color:
                      toolState.image === EToolImage.ZOOM
                        ? "#3377FF"
                        : "#969696",
                  }}
                />
              </div>
            </div>
            <div class="defect-tool-common defect-tool-layer">
              <div
                class="defect-tool-btn"
                onClick={toolLayerHandal.bind(this, "SINGLE")}
                onMouseenter={(e) => {
                  showLayerTips(e, "SINGLE");
                }}
                onMouseleave={() => {
                  tipState.tipStatus = false;
                }}
              >
                <font-awesome-icon
                  icon={["fas", "square"]}
                  style={{
                    fontSize: "18px",
                    color:
                      toolState.layer === EToolLayer.SINGLE
                        ? "#3377FF"
                        : "#969696",
                  }}
                />
              </div>
              <div
                class="defect-tool-btn"
                onClick={toolLayerHandal.bind(this, "DOUBLE")}
                onMouseenter={(e) => {
                  showLayerTips(e, "DOUBLE");
                }}
                onMouseleave={() => {
                  tipState.tipStatus = false;
                }}
              >
                <font-awesome-icon
                  icon={["fas", "pause"]}
                  style={{
                    fontSize: "20px",
                    color:
                      toolState.layer === EToolLayer.DOUBLE
                        ? "#3377FF"
                        : "#969696",
                  }}
                />
              </div>
            </div>
          </div>
        ) : null}
        <div
          class="defect-handle common-border"
          style={{ width: handalWidth.value }}
        >
          <div class="defect-title">
            <div class="defect-title-type" onClick={changeTypeStatus}>
              <font-awesome-icon
                icon={["fas", "list-ul"]}
                style={{
                  fontSize: "18px",
                  color: handalState.typeStates ? "#3377FF" : "#969696",
                }}
              />
            </div>
            <div class="defect-title-tool" onClick={changeToolStatus}>
              <font-awesome-icon
                icon={["fas", "screwdriver-wrench"]}
                style={{
                  fontSize: "18px",
                  color: handalState.toolStatus ? "#3377FF" : "#969696",
                }}
              />
            </div>
            图像操作栏
          </div>
          <div class="defect-handle-cont">
            <div
              class="defect-handle-cont-one"
              style={{
                width: toolState.layer === EToolLayer.SINGLE ? "100%" : "50%",
              }}
            >
              <v-stage ref={stageSingleRef}>
                <v-layer ref={layerSingleRef}>
                  <v-group
                    draggable={toolState.image === EToolImage.DRAG}
                    ref={groupSingleRef}
                    config={configSingleGroup}
                    onWheel={wheelForScale}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMousemove={handleMouseMove}
                  >
                    <v-image config={{ image: imageSingle.value }}></v-image>
                    {defectSingleRecs.value?.map((item, index) => {
                      return (
                        <v-group
                          key={index}
                          config={{
                            id: item.id || "new",
                            draggable: toolState.image === EToolImage.CHOOSE,
                          }}
                        >
                          <v-text
                            config={{
                              x: item.x,
                              y: item.y,
                              fill: item.color,
                              align: "center",
                              text: item.name,
                              fontSize: 12,
                            }}
                          />
                          <v-rect
                            config={{
                              x: item.x,
                              y: item.y,
                              width: item.width,
                              height: item.height,
                              fill: "rgb(0,0,0,0)",
                              stroke: item.color,
                              strokeWidth: 1,
                              name: "rec" + index,
                              id: item.id || "new",
                            }}
                          />
                        </v-group>
                      );
                    })}
                  </v-group>
                  <v-transformer ref={transformerRef} />
                </v-layer>
              </v-stage>
            </div>
            {toolState.layer === EToolLayer.DOUBLE ? (
              <div class="defect-handle-cont-two">
                <v-stage ref={stageDoubleRef}>
                  <v-layer ref={layerDoubleRef}>
                    <v-group
                      draggable={toolState.image === EToolImage.DRAG}
                      ref={groupDoubleRef}
                      config={configDoubleGroup}
                      onWheel={wheelForDoubleScale}
                      onMouseDown={handleMouseDownDouble}
                    >
                      <v-image config={{ image: imageDouble.value }}></v-image>
                      {defectSingleRecs.value?.map((item, index) => {
                        return (
                          <v-group
                            key={index}
                            config={{
                              id: item.id || "new",
                              draggable: toolState.image === EToolImage.CHOOSE,
                            }}
                          >
                            <v-text
                              config={{
                                x: item.x,
                                y: item.y,
                                fill: item.color,
                                align: "center",
                                text: item.name,
                                fontSize: 12,
                              }}
                            />
                            <v-rect
                              config={{
                                x: item.x,
                                y: item.y,
                                width: item.width,
                                height: item.height,
                                fill: "rgb(0,0,0,0)",
                                stroke: item.color,
                                strokeWidth: 1,
                                name: "rec" + index,
                                id: item.id || "new",
                              }}
                            />
                          </v-group>
                        );
                      })}
                    </v-group>
                  </v-layer>
                </v-stage>
              </div>
            ) : null}
          </div>
        </div>
        <div class="defect-list common-border">
          <div class="defect-title">当前识别缺陷列表栏</div>
          <div class="defect-list-detail">
            {props.defectDetailList?.map((item) => {
              return (
                <div class="defect-list-detail-item">
                  <span class="defect-list-detail-item-label">
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              );
            })}
          </div>
          <div class="defect-list-info">
            {defectInfoRenderList.value?.map((item) => {
              return (
                <div class="defect-list-info-item">
                  <div
                    class="defect-list-info-item-check"
                    onClick={changeDefectInfoStatus.bind(
                      this,
                      item.defectTypeId
                    )}
                  >
                    <font-awesome-icon
                      icon={[
                        "fas",
                        defectInfoIds.value?.indexOf(item.defectTypeId) === -1
                          ? "eye-slash"
                          : "eye",
                      ]}
                      style={{
                        fontSize:
                          defectInfoIds.value?.indexOf(item.defectTypeId) === -1
                            ? "15px"
                            : "16px",
                        color:
                          defectInfoIds.value?.indexOf(item.defectTypeId) === -1
                            ? "rgba(0, 0, 0, 0.5)"
                            : "rgba(0, 0, 0, 0.8)",
                      }}
                    />
                  </div>
                  <div class="defect-list-info-item-color">
                    <font-awesome-icon
                      icon={["fas", "vector-square"]}
                      style={{
                        fontSize: "20px",
                        color: item.defectColor,
                      }}
                    />
                  </div>
                  <div class="defect-list-info-item-type">
                    {item.defectType}-{item.defectDes}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {tipState.tipStatus ? (
          <div
            class="defect-tip"
            style={{
              top: `${tipState.positionY}px`,
              left: `${tipState.positionX}px`,
            }}
          >
            <div class="defect-tip-arrow"></div>
            <div>{tipState.tipInfo}</div>
          </div>
        ) : null}
      </div>
    );
  },
});

export default DefectHandal;
