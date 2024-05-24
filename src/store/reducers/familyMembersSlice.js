import { createSlice } from "@reduxjs/toolkit";

export const familyMembersSlice = createSlice({
  name: "familyMembers",

  initialState: {
    id: 1,
    members: [],
    selectedMember: {
      id: 0,
      name: "",
      grossSalary: 250_000,
      isBelow25: false,
      isJustMarriedEligible: false,
      isJustMarried: false,
      date: null,
      isDateSaved: false,
      isPersonalTaxDeduction: false,
      familyDiscountValue: 0,
      isFamilyDiscount: false,
      numberOfSustained: 0,
      numberOfBeneficiaries: 0,
    },
  },

  reducers: {
    /**
     * Template for data
     * --------
     * {
     * id: auto-incremented (starting from 0),
     *
     * name: string,
     * grossSalary: number,
     * netSalary: number,
     *
     * isBelow25: boolean,
     *
     * isJustMarriedEligible: boolean,
     * isJustMarried: boolean,
     * date: date (for storing use .toISOString),
     * isDateSaved: boolean,
     *
     * isPersonalTaxDeduction: boolean,
     *
     * familyDiscountValue: number,
     * isFamilyDiscount: boolean,
     * numberOfSustained: number,
     * numberOfBeneficiaries: number,
     * },
     * --------
     */
    addMember: (state, { payload }) => {
      if (state.members.some(({ name }) => name === payload.name)) return;

      payload.id = state.id;
      state.selectedMember.id = state.id;
      state.selectedMember.name = payload.name;

      state.selectedMember = {
        ...state.selectedMember,
        grossSalary: 250_000,
        netSalary: 0,
        isBelow25: false,
        isJustMarriedEligible: false,
        isJustMarried: false,
        date: null,
        isDateSaved: false,
        isPersonalTaxDeduction: false,
        familyDiscountValue: 0,
        isFamilyDiscount: false,
        numberOfSustained: 0,
        numberOfBeneficiaries: 0,
      };

      state.members[state.id] = state.selectedMember;

      state.id++;
    },

    setSelectedMember: (state, { payload }) => {
      const updatedData = {
        ...state.selectedMember,
        ...payload,
      };

      state.selectedMember = updatedData;
      state.members[state.selectedMember.id] = updatedData;
    },

    setSelectedMemberOnClick: (state, { payload }) => {
      state.selectedMember = state.members[payload.id];
    },

    removeMember: (state, { payload }) => {
      const updatedMembers = state.members.filter(
        (member) => member.id !== payload.id,
      );

      // Update all members id
      state.members = updatedMembers.map((member, index) => ({
        ...member,
        id: index,
      }));

      // Change to length for next id
      state.id = updatedMembers.length;

      state.selectedMember = state.members[state.members.length - 1];
    },
  },
});

export const {
  addMember,
  setSelectedMember,
  setSelectedMemberOnClick,
  removeMember,
} = familyMembersSlice.actions;

export default familyMembersSlice.reducer;
