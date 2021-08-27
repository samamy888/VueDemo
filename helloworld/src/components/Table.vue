<template>
  <div>
    <p>
      <vxe-button
        content="查詢"
        status="primary"
        @click="searchEvent()"
      ></vxe-button>
      <vxe-button
        content="新增"
        status="success"
        @click="openModal()"
      ></vxe-button>
    </p>
    <p>
      <vxe-table :data="tableData">
        <vxe-column field="id" title="ID"></vxe-column>
        <vxe-column title="編輯">
          <template #default="{ row }">
            <vxe-button
              content="編輯"
              status="warning"
              @click="OpenEditModal(row)"
            ></vxe-button>
          </template>
        </vxe-column>
        <vxe-column title="刪除">
          <template #default="{ row }">
            <vxe-button
              content="刪除"
              status="danger"
              @click="deleteEvent(row)"
            ></vxe-button>
          </template>
        </vxe-column>
        <vxe-column field="name" title="Name"></vxe-column>
      </vxe-table>
    </p>
    <vxe-modal id="addModal" v-model="addModal.value" :title="addModal.title">
      <vxe-form :data="formData" @submit="addEvent()" :rules="formRule">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formData.name" placeholder="Name"></vxe-input>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <vxe-button
            content="新增"
            status="success"
            type="submit"
          ></vxe-button>
        </vxe-form-item>
      </vxe-form>
    </vxe-modal>
    <vxe-modal id="editModal" v-model="editModal.value" :title="editModal.title">
      <vxe-form :data="formEditData" @submit="editEvent()" :rules="formRule">
        <vxe-form-item title="名称" field="name">
          <vxe-input v-model="formEditData.name" placeholder="Name"></vxe-input>
        </vxe-form-item>
        <vxe-form-item align="center" span="24">
          <vxe-button
            content="編輯"
            status="warning"
            type="submit"
          ></vxe-button>
        </vxe-form-item>
      </vxe-form>
    </vxe-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { AxiosResponse } from "axios";
import { addData, deleteData, getAllData, updateData } from "../api/api";
import { resultModel, DataModel } from "../model/model";
import VXETable from "vxe-table";
export default defineComponent({
  setup() {
    const tableData = ref<DataModel>();
    const formData = ref<DataModel>({
      id: 0,
      name: "",
    });
    const formEditData = ref<DataModel>({
      id: 0,
      name: "",
    });
    const addModal = ref({
      value: false,
      title: "新增資料",
    });
    const editModal = ref({
      value: false,
      title: "編輯資料",
    });
    const formRule = ref({
      name: [{ required: true, message: "请输入名称" }],
    });
    onMounted(() => {
      searchEvent();
    });
    const searchEvent = () => {
      getAllData()
        .then((res: AxiosResponse<resultModel>) => {
          if (res.data.isSuccess) {
            tableData.value = res.data.data;
          }
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    const openModal = () => {
      addModal["value"].value = true;
    };
    const addEvent = () => {
      VXETable.modal.close("addModal");
      addData(formData.value as DataModel)
        .then((res: AxiosResponse<resultModel>) => {
          if (res.data.isSuccess) {
            alert("新增成功");
          } else {
            alert("新增失敗");
          }
          searchEvent();
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    const editEvent = () => {
      VXETable.modal.close("editModal");
      updateData(formEditData.value as DataModel)
        .then((res: AxiosResponse<resultModel>) => {
          if (res.data.isSuccess) {
            alert("編輯成功");
          } else {
            alert("編輯失敗");
          }
          searchEvent();
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    const OpenEditModal = (row) => {
      editModal["value"].value = true;
      formEditData.value = {
        id:row.id,
        name:row.name,
      }
    };
    const deleteEvent = (row) => {
      console.log(row.id);
      deleteData(row.id)
        .then((res: AxiosResponse<resultModel>) => {
          if (res.data.isSuccess) {
            alert("刪除成功");
          } else {
            alert("刪除失敗");
          }
          searchEvent();
        })
        .catch((ex) => {
          console.log(ex);
        });
    };
    return {
      tableData,
      searchEvent,
      addEvent,
      deleteEvent,
      editEvent,
      openModal,
      OpenEditModal,
      addModal,
      editModal,
      formData,
      formEditData,
      formRule,
    };
  },
});
</script>