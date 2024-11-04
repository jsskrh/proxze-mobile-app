import { createSlice } from "@reduxjs/toolkit";
import {
  createDoc,
  createHelpOption,
  createQuestionTopic,
  createTopic,
  getDocs,
  getHelpOptions,
  getQuestionTopics,
  getTopics,
} from "./helpActions";

const initialState = {
  loading: false,
  error: null,
  success: false,
  newDoc: { topic: null, title: null, content: null, viewers: null },
  topics: [],
  docs: [],
  questionTopics: [],
  options: [],
  questionHub: { activeOption: null, previousOption: null, sequenceList: [] },
};

const helpSlice = createSlice({
  name: "help",
  initialState,
  reducers: {
    clearHelpState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.newDoc = { topic: null, title: null, content: null, viewers: null };
      state.questionHub = {
        activeOption: null,
        previousOption: null,
        sequenceList: [],
      };
    },

    setNewDocHead: (state, { payload }) => {
      state.newDoc.topic = payload.topic;
      state.newDoc.title = payload.title;
      state.newDoc.viewers = payload.viewers;
    },

    setNewDocContent: (state, { payload }) => {
      state.newDoc.content = payload;
    },

    selectOption: (state, { payload }) => {
      if (state.questionHub.activeOption) {
        state.questionHub.previousOption = state.questionHub.activeOption;
      }
      state.questionHub.activeOption = payload;

      state.questionHub.sequenceList = [
        ...state.questionHub.sequenceList,
        payload,
      ];
    },

    goBack: (state, { payload }) => {
      if (state.questionHub.previousOption) {
        state.questionHub.activeOption = state.questionHub.previousOption;
      } else {
        state.questionHub.activeOption = null;
      }

      state.questionHub.sequenceList.pop();

      if (state.questionHub.sequenceList.length > 1) {
        state.questionHub.previousOption =
          state.questionHub.sequenceList[state.sequenceList.length - 2];
      } else {
        state.questionHub.previousOption = null;
      }
    },
  },

  extraReducers: (builder) => {
    // get topics
    builder
      .addCase(getTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopics.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.topics = payload.data;
      })
      .addCase(getTopics.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // create topic
    builder
      .addCase(createTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTopic.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createTopic.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get docs
    builder
      .addCase(getDocs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDocs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.docs = payload.data;
      })
      .addCase(getDocs.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // create doc
    builder
      .addCase(createDoc.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDoc.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        // state.newDoc = {
        //   topic: null,
        //   title: null,
        //   content: null,
        //   viewers: null,
        // };
      })
      .addCase(createDoc.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get question topics
    builder
      .addCase(getQuestionTopics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionTopics.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.questionTopics = payload.data;
      })
      .addCase(getQuestionTopics.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // create question topic
    builder
      .addCase(createQuestionTopic.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createQuestionTopic.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createQuestionTopic.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // get help ooptions
    builder
      .addCase(getHelpOptions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHelpOptions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.options = payload.data;
      })
      .addCase(getHelpOptions.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // create help options
    builder
      .addCase(createHelpOption.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHelpOption.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createHelpOption.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default helpSlice.reducer;
export const {
  setNewDocHead,
  setNewDocContent,
  clearHelpState,
  selectOption,
  goBack,
} = helpSlice.actions;
