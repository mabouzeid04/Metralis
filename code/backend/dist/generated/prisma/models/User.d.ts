import type * as runtime from "@prisma/client/runtime/library";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model User
 *
 */
export type UserModel = runtime.Types.Result.DefaultSelection<Prisma.$UserPayload>;
export type AggregateUser = {
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
export type UserMinAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    name: string | null;
    role: $Enums.UserRole | null;
    status: $Enums.UserStatus | null;
    active: boolean | null;
    lastLoginAt: Date | null;
    approvedById: string | null;
    approvedAt: Date | null;
    rejectedAt: Date | null;
    rejectionReason: string | null;
    phoneNumber: string | null;
    assignmentWhatsappOptIn: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserMaxAggregateOutputType = {
    id: string | null;
    email: string | null;
    passwordHash: string | null;
    name: string | null;
    role: $Enums.UserRole | null;
    status: $Enums.UserStatus | null;
    active: boolean | null;
    lastLoginAt: Date | null;
    approvedById: string | null;
    approvedAt: Date | null;
    rejectedAt: Date | null;
    rejectionReason: string | null;
    phoneNumber: string | null;
    assignmentWhatsappOptIn: boolean | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type UserCountAggregateOutputType = {
    id: number;
    email: number;
    passwordHash: number;
    name: number;
    role: number;
    status: number;
    active: number;
    lastLoginAt: number;
    approvedById: number;
    approvedAt: number;
    rejectedAt: number;
    rejectionReason: number;
    preferences: number;
    phoneNumber: number;
    assignmentWhatsappOptIn: number;
    metadata: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type UserMinAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    name?: true;
    role?: true;
    status?: true;
    active?: true;
    lastLoginAt?: true;
    approvedById?: true;
    approvedAt?: true;
    rejectedAt?: true;
    rejectionReason?: true;
    phoneNumber?: true;
    assignmentWhatsappOptIn?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserMaxAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    name?: true;
    role?: true;
    status?: true;
    active?: true;
    lastLoginAt?: true;
    approvedById?: true;
    approvedAt?: true;
    rejectedAt?: true;
    rejectionReason?: true;
    phoneNumber?: true;
    assignmentWhatsappOptIn?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type UserCountAggregateInputType = {
    id?: true;
    email?: true;
    passwordHash?: true;
    name?: true;
    role?: true;
    status?: true;
    active?: true;
    lastLoginAt?: true;
    approvedById?: true;
    approvedAt?: true;
    rejectedAt?: true;
    rejectionReason?: true;
    preferences?: true;
    phoneNumber?: true;
    assignmentWhatsappOptIn?: true;
    metadata?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type UserAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType;
};
export type GetUserAggregateType<T extends UserAggregateArgs> = {
    [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateUser[P]> : Prisma.GetScalarType<T[P], AggregateUser[P]>;
};
export type UserGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithAggregationInput | Prisma.UserOrderByWithAggregationInput[];
    by: Prisma.UserScalarFieldEnum[] | Prisma.UserScalarFieldEnum;
    having?: Prisma.UserScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: UserCountAggregateInputType | true;
    _min?: UserMinAggregateInputType;
    _max?: UserMaxAggregateInputType;
};
export type UserGroupByOutputType = {
    id: string;
    email: string;
    passwordHash: string;
    name: string;
    role: $Enums.UserRole;
    status: $Enums.UserStatus;
    active: boolean;
    lastLoginAt: Date | null;
    approvedById: string | null;
    approvedAt: Date | null;
    rejectedAt: Date | null;
    rejectionReason: string | null;
    preferences: runtime.JsonValue | null;
    phoneNumber: string | null;
    assignmentWhatsappOptIn: boolean;
    metadata: runtime.JsonValue | null;
    createdAt: Date;
    updatedAt: Date;
    _count: UserCountAggregateOutputType | null;
    _min: UserMinAggregateOutputType | null;
    _max: UserMaxAggregateOutputType | null;
};
type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<UserGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]> : Prisma.GetScalarType<T[P], UserGroupByOutputType[P]>;
}>>;
export type UserWhereInput = {
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    active?: Prisma.BoolFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    approvedById?: Prisma.StringNullableFilter<"User"> | string | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"User"> | string | null;
    preferences?: Prisma.JsonNullableFilter<"User">;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFilter<"User"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"User">;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    approvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    reportedWorkOrders?: Prisma.WorkOrderListRelationFilter;
    assignedWorkOrders?: Prisma.WorkOrderListRelationFilter;
    repairActions?: Prisma.RepairActionListRelationFilter;
    documents?: Prisma.DocumentListRelationFilter;
    approvals?: Prisma.UserListRelationFilter;
    chatConversations?: Prisma.ChatConversationListRelationFilter;
    aiFeedback?: Prisma.ChatMessageFeedbackListRelationFilter;
    areaLeaderWorkOrders?: Prisma.WorkOrderListRelationFilter;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderListRelationFilter;
    performerWorkOrders?: Prisma.WorkOrderListRelationFilter;
    machineReceiverWorkOrders?: Prisma.WorkOrderListRelationFilter;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderListRelationFilter;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderListRelationFilter;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderListRelationFilter;
};
export type UserOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferences?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignmentWhatsappOptIn?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    approvedBy?: Prisma.UserOrderByWithRelationInput;
    reportedWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    assignedWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    repairActions?: Prisma.RepairActionOrderByRelationAggregateInput;
    documents?: Prisma.DocumentOrderByRelationAggregateInput;
    approvals?: Prisma.UserOrderByRelationAggregateInput;
    chatConversations?: Prisma.ChatConversationOrderByRelationAggregateInput;
    aiFeedback?: Prisma.ChatMessageFeedbackOrderByRelationAggregateInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    performerWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderOrderByRelationAggregateInput;
};
export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    email?: string;
    AND?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    OR?: Prisma.UserWhereInput[];
    NOT?: Prisma.UserWhereInput | Prisma.UserWhereInput[];
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    active?: Prisma.BoolFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    approvedById?: Prisma.StringNullableFilter<"User"> | string | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"User"> | string | null;
    preferences?: Prisma.JsonNullableFilter<"User">;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFilter<"User"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"User">;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    approvedBy?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    reportedWorkOrders?: Prisma.WorkOrderListRelationFilter;
    assignedWorkOrders?: Prisma.WorkOrderListRelationFilter;
    repairActions?: Prisma.RepairActionListRelationFilter;
    documents?: Prisma.DocumentListRelationFilter;
    approvals?: Prisma.UserListRelationFilter;
    chatConversations?: Prisma.ChatConversationListRelationFilter;
    aiFeedback?: Prisma.ChatMessageFeedbackListRelationFilter;
    areaLeaderWorkOrders?: Prisma.WorkOrderListRelationFilter;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderListRelationFilter;
    performerWorkOrders?: Prisma.WorkOrderListRelationFilter;
    machineReceiverWorkOrders?: Prisma.WorkOrderListRelationFilter;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderListRelationFilter;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderListRelationFilter;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderListRelationFilter;
}, "id" | "email">;
export type UserOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedById?: Prisma.SortOrderInput | Prisma.SortOrder;
    approvedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrderInput | Prisma.SortOrder;
    preferences?: Prisma.SortOrderInput | Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    assignmentWhatsappOptIn?: Prisma.SortOrder;
    metadata?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.UserCountOrderByAggregateInput;
    _max?: Prisma.UserMaxOrderByAggregateInput;
    _min?: Prisma.UserMinOrderByAggregateInput;
};
export type UserScalarWhereWithAggregatesInput = {
    AND?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    OR?: Prisma.UserScalarWhereWithAggregatesInput[];
    NOT?: Prisma.UserScalarWhereWithAggregatesInput | Prisma.UserScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"User"> | string;
    email?: Prisma.StringWithAggregatesFilter<"User"> | string;
    passwordHash?: Prisma.StringWithAggregatesFilter<"User"> | string;
    name?: Prisma.StringWithAggregatesFilter<"User"> | string;
    role?: Prisma.EnumUserRoleWithAggregatesFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusWithAggregatesFilter<"User"> | $Enums.UserStatus;
    active?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    approvedById?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    approvedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    preferences?: Prisma.JsonNullableWithAggregatesFilter<"User">;
    phoneNumber?: Prisma.StringNullableWithAggregatesFilter<"User"> | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolWithAggregatesFilter<"User"> | boolean;
    metadata?: Prisma.JsonNullableWithAggregatesFilter<"User">;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"User"> | Date | string;
};
export type UserCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserCreateManyInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type UserNullableScalarRelationFilter = {
    is?: Prisma.UserWhereInput | null;
    isNot?: Prisma.UserWhereInput | null;
};
export type UserListRelationFilter = {
    every?: Prisma.UserWhereInput;
    some?: Prisma.UserWhereInput;
    none?: Prisma.UserWhereInput;
};
export type UserOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type UserCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    approvedById?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    preferences?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    assignmentWhatsappOptIn?: Prisma.SortOrder;
    metadata?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    approvedById?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    assignmentWhatsappOptIn?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    passwordHash?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    role?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    active?: Prisma.SortOrder;
    lastLoginAt?: Prisma.SortOrder;
    approvedById?: Prisma.SortOrder;
    approvedAt?: Prisma.SortOrder;
    rejectedAt?: Prisma.SortOrder;
    rejectionReason?: Prisma.SortOrder;
    phoneNumber?: Prisma.SortOrder;
    assignmentWhatsappOptIn?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type UserScalarRelationFilter = {
    is?: Prisma.UserWhereInput;
    isNot?: Prisma.UserWhereInput;
};
export type UserCreateNestedOneWithoutApprovalsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovalsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedManyWithoutApprovedByInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovedByInput, Prisma.UserUncheckedCreateWithoutApprovedByInput> | Prisma.UserCreateWithoutApprovedByInput[] | Prisma.UserUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovedByInput | Prisma.UserCreateOrConnectWithoutApprovedByInput[];
    createMany?: Prisma.UserCreateManyApprovedByInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type UserUncheckedCreateNestedManyWithoutApprovedByInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovedByInput, Prisma.UserUncheckedCreateWithoutApprovedByInput> | Prisma.UserCreateWithoutApprovedByInput[] | Prisma.UserUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovedByInput | Prisma.UserCreateOrConnectWithoutApprovedByInput[];
    createMany?: Prisma.UserCreateManyApprovedByInputEnvelope;
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type EnumUserRoleFieldUpdateOperationsInput = {
    set?: $Enums.UserRole;
};
export type EnumUserStatusFieldUpdateOperationsInput = {
    set?: $Enums.UserStatus;
};
export type BoolFieldUpdateOperationsInput = {
    set?: boolean;
};
export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null;
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type UserUpdateOneWithoutApprovalsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovalsInput;
    upsert?: Prisma.UserUpsertWithoutApprovalsInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutApprovalsInput, Prisma.UserUpdateWithoutApprovalsInput>, Prisma.UserUncheckedUpdateWithoutApprovalsInput>;
};
export type UserUpdateManyWithoutApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovedByInput, Prisma.UserUncheckedCreateWithoutApprovedByInput> | Prisma.UserCreateWithoutApprovedByInput[] | Prisma.UserUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovedByInput | Prisma.UserCreateOrConnectWithoutApprovedByInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutApprovedByInput | Prisma.UserUpsertWithWhereUniqueWithoutApprovedByInput[];
    createMany?: Prisma.UserCreateManyApprovedByInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutApprovedByInput | Prisma.UserUpdateWithWhereUniqueWithoutApprovedByInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutApprovedByInput | Prisma.UserUpdateManyWithWhereWithoutApprovedByInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserUncheckedUpdateManyWithoutApprovedByNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutApprovedByInput, Prisma.UserUncheckedCreateWithoutApprovedByInput> | Prisma.UserCreateWithoutApprovedByInput[] | Prisma.UserUncheckedCreateWithoutApprovedByInput[];
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutApprovedByInput | Prisma.UserCreateOrConnectWithoutApprovedByInput[];
    upsert?: Prisma.UserUpsertWithWhereUniqueWithoutApprovedByInput | Prisma.UserUpsertWithWhereUniqueWithoutApprovedByInput[];
    createMany?: Prisma.UserCreateManyApprovedByInputEnvelope;
    set?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    disconnect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    delete?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    connect?: Prisma.UserWhereUniqueInput | Prisma.UserWhereUniqueInput[];
    update?: Prisma.UserUpdateWithWhereUniqueWithoutApprovedByInput | Prisma.UserUpdateWithWhereUniqueWithoutApprovedByInput[];
    updateMany?: Prisma.UserUpdateManyWithWhereWithoutApprovedByInput | Prisma.UserUpdateManyWithWhereWithoutApprovedByInput[];
    deleteMany?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
};
export type UserCreateNestedOneWithoutReportedWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReportedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutReportedWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReportedWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutAssignedWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAssignedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAssignedWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAssignedWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutAreaLeaderWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAreaLeaderWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAreaLeaderWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAreaLeaderWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutMaintenanceSupervisorWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceSupervisorWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMaintenanceSupervisorWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutPerformerWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPerformerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutPerformerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPerformerWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutMachineReceiverWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMachineReceiverWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMachineReceiverWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMachineReceiverWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutResponsibleEngineerWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutResponsibleEngineerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutResponsibleEngineerWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutMaintenanceEngineerWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceEngineerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMaintenanceEngineerWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserCreateNestedOneWithoutMaintenanceManagerWorkOrdersInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceManagerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMaintenanceManagerWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutReportedWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutReportedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutReportedWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutReportedWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutReportedWorkOrdersInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutReportedWorkOrdersInput, Prisma.UserUpdateWithoutReportedWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutReportedWorkOrdersInput>;
};
export type UserUpdateOneWithoutAssignedWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAssignedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAssignedWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAssignedWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutAssignedWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAssignedWorkOrdersInput, Prisma.UserUpdateWithoutAssignedWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutAssignedWorkOrdersInput>;
};
export type UserUpdateOneWithoutAreaLeaderWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAreaLeaderWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAreaLeaderWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAreaLeaderWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutAreaLeaderWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAreaLeaderWorkOrdersInput, Prisma.UserUpdateWithoutAreaLeaderWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutAreaLeaderWorkOrdersInput>;
};
export type UserUpdateOneWithoutMaintenanceSupervisorWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceSupervisorWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMaintenanceSupervisorWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutMaintenanceSupervisorWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUpdateWithoutMaintenanceSupervisorWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutMaintenanceSupervisorWorkOrdersInput>;
};
export type UserUpdateOneWithoutPerformerWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutPerformerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutPerformerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutPerformerWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutPerformerWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutPerformerWorkOrdersInput, Prisma.UserUpdateWithoutPerformerWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutPerformerWorkOrdersInput>;
};
export type UserUpdateOneWithoutMachineReceiverWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMachineReceiverWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMachineReceiverWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMachineReceiverWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutMachineReceiverWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMachineReceiverWorkOrdersInput, Prisma.UserUpdateWithoutMachineReceiverWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutMachineReceiverWorkOrdersInput>;
};
export type UserUpdateOneWithoutResponsibleEngineerWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutResponsibleEngineerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutResponsibleEngineerWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutResponsibleEngineerWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUpdateWithoutResponsibleEngineerWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutResponsibleEngineerWorkOrdersInput>;
};
export type UserUpdateOneWithoutMaintenanceEngineerWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceEngineerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMaintenanceEngineerWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutMaintenanceEngineerWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUpdateWithoutMaintenanceEngineerWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutMaintenanceEngineerWorkOrdersInput>;
};
export type UserUpdateOneWithoutMaintenanceManagerWorkOrdersNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceManagerWorkOrdersInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutMaintenanceManagerWorkOrdersInput;
    upsert?: Prisma.UserUpsertWithoutMaintenanceManagerWorkOrdersInput;
    disconnect?: Prisma.UserWhereInput | boolean;
    delete?: Prisma.UserWhereInput | boolean;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUpdateWithoutMaintenanceManagerWorkOrdersInput>, Prisma.UserUncheckedUpdateWithoutMaintenanceManagerWorkOrdersInput>;
};
export type UserCreateNestedOneWithoutRepairActionsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRepairActionsInput, Prisma.UserUncheckedCreateWithoutRepairActionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRepairActionsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutRepairActionsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutRepairActionsInput, Prisma.UserUncheckedCreateWithoutRepairActionsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutRepairActionsInput;
    upsert?: Prisma.UserUpsertWithoutRepairActionsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutRepairActionsInput, Prisma.UserUpdateWithoutRepairActionsInput>, Prisma.UserUncheckedUpdateWithoutRepairActionsInput>;
};
export type UserCreateNestedOneWithoutDocumentsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDocumentsInput, Prisma.UserUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDocumentsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutDocumentsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutDocumentsInput, Prisma.UserUncheckedCreateWithoutDocumentsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutDocumentsInput;
    upsert?: Prisma.UserUpsertWithoutDocumentsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutDocumentsInput, Prisma.UserUpdateWithoutDocumentsInput>, Prisma.UserUncheckedUpdateWithoutDocumentsInput>;
};
export type UserCreateNestedOneWithoutChatConversationsInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutChatConversationsInput, Prisma.UserUncheckedCreateWithoutChatConversationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutChatConversationsInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutChatConversationsNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutChatConversationsInput, Prisma.UserUncheckedCreateWithoutChatConversationsInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutChatConversationsInput;
    upsert?: Prisma.UserUpsertWithoutChatConversationsInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutChatConversationsInput, Prisma.UserUpdateWithoutChatConversationsInput>, Prisma.UserUncheckedUpdateWithoutChatConversationsInput>;
};
export type UserCreateNestedOneWithoutAiFeedbackInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAiFeedbackInput, Prisma.UserUncheckedCreateWithoutAiFeedbackInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAiFeedbackInput;
    connect?: Prisma.UserWhereUniqueInput;
};
export type UserUpdateOneRequiredWithoutAiFeedbackNestedInput = {
    create?: Prisma.XOR<Prisma.UserCreateWithoutAiFeedbackInput, Prisma.UserUncheckedCreateWithoutAiFeedbackInput>;
    connectOrCreate?: Prisma.UserCreateOrConnectWithoutAiFeedbackInput;
    upsert?: Prisma.UserUpsertWithoutAiFeedbackInput;
    connect?: Prisma.UserWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.UserUpdateToOneWithWhereWithoutAiFeedbackInput, Prisma.UserUpdateWithoutAiFeedbackInput>, Prisma.UserUncheckedUpdateWithoutAiFeedbackInput>;
};
export type UserCreateWithoutApprovalsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutApprovalsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutApprovalsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
};
export type UserCreateWithoutApprovedByInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutApprovedByInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutApprovedByInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutApprovedByInput, Prisma.UserUncheckedCreateWithoutApprovedByInput>;
};
export type UserCreateManyApprovedByInputEnvelope = {
    data: Prisma.UserCreateManyApprovedByInput | Prisma.UserCreateManyApprovedByInput[];
    skipDuplicates?: boolean;
};
export type UserUpsertWithoutApprovalsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutApprovalsInput, Prisma.UserUncheckedUpdateWithoutApprovalsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutApprovalsInput, Prisma.UserUncheckedCreateWithoutApprovalsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutApprovalsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutApprovalsInput, Prisma.UserUncheckedUpdateWithoutApprovalsInput>;
};
export type UserUpdateWithoutApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutApprovalsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithWhereUniqueWithoutApprovedByInput = {
    where: Prisma.UserWhereUniqueInput;
    update: Prisma.XOR<Prisma.UserUpdateWithoutApprovedByInput, Prisma.UserUncheckedUpdateWithoutApprovedByInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutApprovedByInput, Prisma.UserUncheckedCreateWithoutApprovedByInput>;
};
export type UserUpdateWithWhereUniqueWithoutApprovedByInput = {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutApprovedByInput, Prisma.UserUncheckedUpdateWithoutApprovedByInput>;
};
export type UserUpdateManyWithWhereWithoutApprovedByInput = {
    where: Prisma.UserScalarWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyWithoutApprovedByInput>;
};
export type UserScalarWhereInput = {
    AND?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    OR?: Prisma.UserScalarWhereInput[];
    NOT?: Prisma.UserScalarWhereInput | Prisma.UserScalarWhereInput[];
    id?: Prisma.StringFilter<"User"> | string;
    email?: Prisma.StringFilter<"User"> | string;
    passwordHash?: Prisma.StringFilter<"User"> | string;
    name?: Prisma.StringFilter<"User"> | string;
    role?: Prisma.EnumUserRoleFilter<"User"> | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFilter<"User"> | $Enums.UserStatus;
    active?: Prisma.BoolFilter<"User"> | boolean;
    lastLoginAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    approvedById?: Prisma.StringNullableFilter<"User"> | string | null;
    approvedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    rejectedAt?: Prisma.DateTimeNullableFilter<"User"> | Date | string | null;
    rejectionReason?: Prisma.StringNullableFilter<"User"> | string | null;
    preferences?: Prisma.JsonNullableFilter<"User">;
    phoneNumber?: Prisma.StringNullableFilter<"User"> | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFilter<"User"> | boolean;
    metadata?: Prisma.JsonNullableFilter<"User">;
    createdAt?: Prisma.DateTimeFilter<"User"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"User"> | Date | string;
};
export type UserCreateWithoutReportedWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutReportedWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutReportedWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutReportedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutReportedWorkOrdersInput>;
};
export type UserCreateWithoutAssignedWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutAssignedWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutAssignedWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAssignedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAssignedWorkOrdersInput>;
};
export type UserCreateWithoutAreaLeaderWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutAreaLeaderWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutAreaLeaderWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAreaLeaderWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAreaLeaderWorkOrdersInput>;
};
export type UserCreateWithoutMaintenanceSupervisorWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutMaintenanceSupervisorWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutMaintenanceSupervisorWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceSupervisorWorkOrdersInput>;
};
export type UserCreateWithoutPerformerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutPerformerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutPerformerWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutPerformerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutPerformerWorkOrdersInput>;
};
export type UserCreateWithoutMachineReceiverWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutMachineReceiverWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutMachineReceiverWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMachineReceiverWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMachineReceiverWorkOrdersInput>;
};
export type UserCreateWithoutResponsibleEngineerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutResponsibleEngineerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutResponsibleEngineerWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutResponsibleEngineerWorkOrdersInput>;
};
export type UserCreateWithoutMaintenanceEngineerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutMaintenanceEngineerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutMaintenanceEngineerWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceEngineerWorkOrdersInput>;
};
export type UserCreateWithoutMaintenanceManagerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
};
export type UserUncheckedCreateWithoutMaintenanceManagerWorkOrdersInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
};
export type UserCreateOrConnectWithoutMaintenanceManagerWorkOrdersInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceManagerWorkOrdersInput>;
};
export type UserUpsertWithoutReportedWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutReportedWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutReportedWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutReportedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutReportedWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutReportedWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutReportedWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutReportedWorkOrdersInput>;
};
export type UserUpdateWithoutReportedWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutReportedWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutAssignedWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAssignedWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutAssignedWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAssignedWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAssignedWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAssignedWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAssignedWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutAssignedWorkOrdersInput>;
};
export type UserUpdateWithoutAssignedWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutAssignedWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutAreaLeaderWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAreaLeaderWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutAreaLeaderWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAreaLeaderWorkOrdersInput, Prisma.UserUncheckedCreateWithoutAreaLeaderWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAreaLeaderWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAreaLeaderWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutAreaLeaderWorkOrdersInput>;
};
export type UserUpdateWithoutAreaLeaderWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutAreaLeaderWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutMaintenanceSupervisorWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMaintenanceSupervisorWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceSupervisorWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMaintenanceSupervisorWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMaintenanceSupervisorWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMaintenanceSupervisorWorkOrdersInput>;
};
export type UserUpdateWithoutMaintenanceSupervisorWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutMaintenanceSupervisorWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutPerformerWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutPerformerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutPerformerWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutPerformerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutPerformerWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutPerformerWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutPerformerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutPerformerWorkOrdersInput>;
};
export type UserUpdateWithoutPerformerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutPerformerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutMachineReceiverWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMachineReceiverWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMachineReceiverWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMachineReceiverWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMachineReceiverWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMachineReceiverWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMachineReceiverWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMachineReceiverWorkOrdersInput>;
};
export type UserUpdateWithoutMachineReceiverWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutMachineReceiverWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutResponsibleEngineerWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutResponsibleEngineerWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutResponsibleEngineerWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutResponsibleEngineerWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutResponsibleEngineerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutResponsibleEngineerWorkOrdersInput>;
};
export type UserUpdateWithoutResponsibleEngineerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutResponsibleEngineerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutMaintenanceEngineerWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMaintenanceEngineerWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceEngineerWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMaintenanceEngineerWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMaintenanceEngineerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMaintenanceEngineerWorkOrdersInput>;
};
export type UserUpdateWithoutMaintenanceEngineerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutMaintenanceEngineerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUpsertWithoutMaintenanceManagerWorkOrdersInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMaintenanceManagerWorkOrdersInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUncheckedCreateWithoutMaintenanceManagerWorkOrdersInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutMaintenanceManagerWorkOrdersInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutMaintenanceManagerWorkOrdersInput, Prisma.UserUncheckedUpdateWithoutMaintenanceManagerWorkOrdersInput>;
};
export type UserUpdateWithoutMaintenanceManagerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
};
export type UserUncheckedUpdateWithoutMaintenanceManagerWorkOrdersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
};
export type UserCreateWithoutRepairActionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutRepairActionsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutRepairActionsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutRepairActionsInput, Prisma.UserUncheckedCreateWithoutRepairActionsInput>;
};
export type UserUpsertWithoutRepairActionsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutRepairActionsInput, Prisma.UserUncheckedUpdateWithoutRepairActionsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutRepairActionsInput, Prisma.UserUncheckedCreateWithoutRepairActionsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutRepairActionsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutRepairActionsInput, Prisma.UserUncheckedUpdateWithoutRepairActionsInput>;
};
export type UserUpdateWithoutRepairActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutRepairActionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserCreateWithoutDocumentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutDocumentsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutDocumentsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutDocumentsInput, Prisma.UserUncheckedCreateWithoutDocumentsInput>;
};
export type UserUpsertWithoutDocumentsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutDocumentsInput, Prisma.UserUncheckedUpdateWithoutDocumentsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutDocumentsInput, Prisma.UserUncheckedCreateWithoutDocumentsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutDocumentsInput, Prisma.UserUncheckedUpdateWithoutDocumentsInput>;
};
export type UserUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutDocumentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserCreateWithoutChatConversationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    aiFeedback?: Prisma.ChatMessageFeedbackCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutChatConversationsInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutChatConversationsInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutChatConversationsInput, Prisma.UserUncheckedCreateWithoutChatConversationsInput>;
};
export type UserUpsertWithoutChatConversationsInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutChatConversationsInput, Prisma.UserUncheckedUpdateWithoutChatConversationsInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutChatConversationsInput, Prisma.UserUncheckedCreateWithoutChatConversationsInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutChatConversationsInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutChatConversationsInput, Prisma.UserUncheckedUpdateWithoutChatConversationsInput>;
};
export type UserUpdateWithoutChatConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutChatConversationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserCreateWithoutAiFeedbackInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    approvedBy?: Prisma.UserCreateNestedOneWithoutApprovalsInput;
    reportedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserUncheckedCreateWithoutAiFeedbackInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedById?: string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutReportedByInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAssignedToInput;
    repairActions?: Prisma.RepairActionUncheckedCreateNestedManyWithoutPerformedByInput;
    documents?: Prisma.DocumentUncheckedCreateNestedManyWithoutUploadedByInput;
    approvals?: Prisma.UserUncheckedCreateNestedManyWithoutApprovedByInput;
    chatConversations?: Prisma.ChatConversationUncheckedCreateNestedManyWithoutUserInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutAreaLeaderInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceSupervisorInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutPerformerInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMachineReceiverInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutResponsibleEngineerInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceEngineerInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedCreateNestedManyWithoutMaintenanceManagerInput;
};
export type UserCreateOrConnectWithoutAiFeedbackInput = {
    where: Prisma.UserWhereUniqueInput;
    create: Prisma.XOR<Prisma.UserCreateWithoutAiFeedbackInput, Prisma.UserUncheckedCreateWithoutAiFeedbackInput>;
};
export type UserUpsertWithoutAiFeedbackInput = {
    update: Prisma.XOR<Prisma.UserUpdateWithoutAiFeedbackInput, Prisma.UserUncheckedUpdateWithoutAiFeedbackInput>;
    create: Prisma.XOR<Prisma.UserCreateWithoutAiFeedbackInput, Prisma.UserUncheckedCreateWithoutAiFeedbackInput>;
    where?: Prisma.UserWhereInput;
};
export type UserUpdateToOneWithWhereWithoutAiFeedbackInput = {
    where?: Prisma.UserWhereInput;
    data: Prisma.XOR<Prisma.UserUpdateWithoutAiFeedbackInput, Prisma.UserUncheckedUpdateWithoutAiFeedbackInput>;
};
export type UserUpdateWithoutAiFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    approvedBy?: Prisma.UserUpdateOneWithoutApprovalsNestedInput;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutAiFeedbackInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedById?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserCreateManyApprovedByInput = {
    id?: string;
    email: string;
    passwordHash: string;
    name: string;
    role?: $Enums.UserRole;
    status?: $Enums.UserStatus;
    active?: boolean;
    lastLoginAt?: Date | string | null;
    approvedAt?: Date | string | null;
    rejectedAt?: Date | string | null;
    rejectionReason?: string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: string | null;
    assignmentWhatsappOptIn?: boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type UserUpdateWithoutApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateWithoutApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reportedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutReportedByNestedInput;
    assignedWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAssignedToNestedInput;
    repairActions?: Prisma.RepairActionUncheckedUpdateManyWithoutPerformedByNestedInput;
    documents?: Prisma.DocumentUncheckedUpdateManyWithoutUploadedByNestedInput;
    approvals?: Prisma.UserUncheckedUpdateManyWithoutApprovedByNestedInput;
    chatConversations?: Prisma.ChatConversationUncheckedUpdateManyWithoutUserNestedInput;
    aiFeedback?: Prisma.ChatMessageFeedbackUncheckedUpdateManyWithoutUserNestedInput;
    areaLeaderWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutAreaLeaderNestedInput;
    maintenanceSupervisorWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceSupervisorNestedInput;
    performerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutPerformerNestedInput;
    machineReceiverWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMachineReceiverNestedInput;
    responsibleEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutResponsibleEngineerNestedInput;
    maintenanceEngineerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceEngineerNestedInput;
    maintenanceManagerWorkOrders?: Prisma.WorkOrderUncheckedUpdateManyWithoutMaintenanceManagerNestedInput;
};
export type UserUncheckedUpdateManyWithoutApprovedByInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    passwordHash?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    role?: Prisma.EnumUserRoleFieldUpdateOperationsInput | $Enums.UserRole;
    status?: Prisma.EnumUserStatusFieldUpdateOperationsInput | $Enums.UserStatus;
    active?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    lastLoginAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    approvedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    rejectionReason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    preferences?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    phoneNumber?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    assignmentWhatsappOptIn?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    metadata?: Prisma.NullableJsonNullValueInput | runtime.InputJsonValue;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type UserCountOutputType
 */
export type UserCountOutputType = {
    reportedWorkOrders: number;
    assignedWorkOrders: number;
    repairActions: number;
    documents: number;
    approvals: number;
    chatConversations: number;
    aiFeedback: number;
    areaLeaderWorkOrders: number;
    maintenanceSupervisorWorkOrders: number;
    performerWorkOrders: number;
    machineReceiverWorkOrders: number;
    responsibleEngineerWorkOrders: number;
    maintenanceEngineerWorkOrders: number;
    maintenanceManagerWorkOrders: number;
};
export type UserCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    reportedWorkOrders?: boolean | UserCountOutputTypeCountReportedWorkOrdersArgs;
    assignedWorkOrders?: boolean | UserCountOutputTypeCountAssignedWorkOrdersArgs;
    repairActions?: boolean | UserCountOutputTypeCountRepairActionsArgs;
    documents?: boolean | UserCountOutputTypeCountDocumentsArgs;
    approvals?: boolean | UserCountOutputTypeCountApprovalsArgs;
    chatConversations?: boolean | UserCountOutputTypeCountChatConversationsArgs;
    aiFeedback?: boolean | UserCountOutputTypeCountAiFeedbackArgs;
    areaLeaderWorkOrders?: boolean | UserCountOutputTypeCountAreaLeaderWorkOrdersArgs;
    maintenanceSupervisorWorkOrders?: boolean | UserCountOutputTypeCountMaintenanceSupervisorWorkOrdersArgs;
    performerWorkOrders?: boolean | UserCountOutputTypeCountPerformerWorkOrdersArgs;
    machineReceiverWorkOrders?: boolean | UserCountOutputTypeCountMachineReceiverWorkOrdersArgs;
    responsibleEngineerWorkOrders?: boolean | UserCountOutputTypeCountResponsibleEngineerWorkOrdersArgs;
    maintenanceEngineerWorkOrders?: boolean | UserCountOutputTypeCountMaintenanceEngineerWorkOrdersArgs;
    maintenanceManagerWorkOrders?: boolean | UserCountOutputTypeCountMaintenanceManagerWorkOrdersArgs;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: Prisma.UserCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountReportedWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAssignedWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountRepairActionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RepairActionWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountDocumentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.DocumentWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountApprovalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountChatConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatConversationWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAiFeedbackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ChatMessageFeedbackWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountAreaLeaderWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMaintenanceSupervisorWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountPerformerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMachineReceiverWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountResponsibleEngineerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMaintenanceEngineerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
/**
 * UserCountOutputType without action
 */
export type UserCountOutputTypeCountMaintenanceManagerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.WorkOrderWhereInput;
};
export type UserSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    status?: boolean;
    active?: boolean;
    lastLoginAt?: boolean;
    approvedById?: boolean;
    approvedAt?: boolean;
    rejectedAt?: boolean;
    rejectionReason?: boolean;
    preferences?: boolean;
    phoneNumber?: boolean;
    assignmentWhatsappOptIn?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    approvedBy?: boolean | Prisma.User$approvedByArgs<ExtArgs>;
    reportedWorkOrders?: boolean | Prisma.User$reportedWorkOrdersArgs<ExtArgs>;
    assignedWorkOrders?: boolean | Prisma.User$assignedWorkOrdersArgs<ExtArgs>;
    repairActions?: boolean | Prisma.User$repairActionsArgs<ExtArgs>;
    documents?: boolean | Prisma.User$documentsArgs<ExtArgs>;
    approvals?: boolean | Prisma.User$approvalsArgs<ExtArgs>;
    chatConversations?: boolean | Prisma.User$chatConversationsArgs<ExtArgs>;
    aiFeedback?: boolean | Prisma.User$aiFeedbackArgs<ExtArgs>;
    areaLeaderWorkOrders?: boolean | Prisma.User$areaLeaderWorkOrdersArgs<ExtArgs>;
    maintenanceSupervisorWorkOrders?: boolean | Prisma.User$maintenanceSupervisorWorkOrdersArgs<ExtArgs>;
    performerWorkOrders?: boolean | Prisma.User$performerWorkOrdersArgs<ExtArgs>;
    machineReceiverWorkOrders?: boolean | Prisma.User$machineReceiverWorkOrdersArgs<ExtArgs>;
    responsibleEngineerWorkOrders?: boolean | Prisma.User$responsibleEngineerWorkOrdersArgs<ExtArgs>;
    maintenanceEngineerWorkOrders?: boolean | Prisma.User$maintenanceEngineerWorkOrdersArgs<ExtArgs>;
    maintenanceManagerWorkOrders?: boolean | Prisma.User$maintenanceManagerWorkOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    status?: boolean;
    active?: boolean;
    lastLoginAt?: boolean;
    approvedById?: boolean;
    approvedAt?: boolean;
    rejectedAt?: boolean;
    rejectionReason?: boolean;
    preferences?: boolean;
    phoneNumber?: boolean;
    assignmentWhatsappOptIn?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    approvedBy?: boolean | Prisma.User$approvedByArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    status?: boolean;
    active?: boolean;
    lastLoginAt?: boolean;
    approvedById?: boolean;
    approvedAt?: boolean;
    rejectedAt?: boolean;
    rejectionReason?: boolean;
    preferences?: boolean;
    phoneNumber?: boolean;
    assignmentWhatsappOptIn?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    approvedBy?: boolean | Prisma.User$approvedByArgs<ExtArgs>;
}, ExtArgs["result"]["user"]>;
export type UserSelectScalar = {
    id?: boolean;
    email?: boolean;
    passwordHash?: boolean;
    name?: boolean;
    role?: boolean;
    status?: boolean;
    active?: boolean;
    lastLoginAt?: boolean;
    approvedById?: boolean;
    approvedAt?: boolean;
    rejectedAt?: boolean;
    rejectionReason?: boolean;
    preferences?: boolean;
    phoneNumber?: boolean;
    assignmentWhatsappOptIn?: boolean;
    metadata?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type UserOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "email" | "passwordHash" | "name" | "role" | "status" | "active" | "lastLoginAt" | "approvedById" | "approvedAt" | "rejectedAt" | "rejectionReason" | "preferences" | "phoneNumber" | "assignmentWhatsappOptIn" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>;
export type UserInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    approvedBy?: boolean | Prisma.User$approvedByArgs<ExtArgs>;
    reportedWorkOrders?: boolean | Prisma.User$reportedWorkOrdersArgs<ExtArgs>;
    assignedWorkOrders?: boolean | Prisma.User$assignedWorkOrdersArgs<ExtArgs>;
    repairActions?: boolean | Prisma.User$repairActionsArgs<ExtArgs>;
    documents?: boolean | Prisma.User$documentsArgs<ExtArgs>;
    approvals?: boolean | Prisma.User$approvalsArgs<ExtArgs>;
    chatConversations?: boolean | Prisma.User$chatConversationsArgs<ExtArgs>;
    aiFeedback?: boolean | Prisma.User$aiFeedbackArgs<ExtArgs>;
    areaLeaderWorkOrders?: boolean | Prisma.User$areaLeaderWorkOrdersArgs<ExtArgs>;
    maintenanceSupervisorWorkOrders?: boolean | Prisma.User$maintenanceSupervisorWorkOrdersArgs<ExtArgs>;
    performerWorkOrders?: boolean | Prisma.User$performerWorkOrdersArgs<ExtArgs>;
    machineReceiverWorkOrders?: boolean | Prisma.User$machineReceiverWorkOrdersArgs<ExtArgs>;
    responsibleEngineerWorkOrders?: boolean | Prisma.User$responsibleEngineerWorkOrdersArgs<ExtArgs>;
    maintenanceEngineerWorkOrders?: boolean | Prisma.User$maintenanceEngineerWorkOrdersArgs<ExtArgs>;
    maintenanceManagerWorkOrders?: boolean | Prisma.User$maintenanceManagerWorkOrdersArgs<ExtArgs>;
    _count?: boolean | Prisma.UserCountOutputTypeDefaultArgs<ExtArgs>;
};
export type UserIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    approvedBy?: boolean | Prisma.User$approvedByArgs<ExtArgs>;
};
export type UserIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    approvedBy?: boolean | Prisma.User$approvedByArgs<ExtArgs>;
};
export type $UserPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "User";
    objects: {
        approvedBy: Prisma.$UserPayload<ExtArgs> | null;
        reportedWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        assignedWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        repairActions: Prisma.$RepairActionPayload<ExtArgs>[];
        documents: Prisma.$DocumentPayload<ExtArgs>[];
        approvals: Prisma.$UserPayload<ExtArgs>[];
        chatConversations: Prisma.$ChatConversationPayload<ExtArgs>[];
        aiFeedback: Prisma.$ChatMessageFeedbackPayload<ExtArgs>[];
        areaLeaderWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        maintenanceSupervisorWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        performerWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        machineReceiverWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        responsibleEngineerWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        maintenanceEngineerWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
        maintenanceManagerWorkOrders: Prisma.$WorkOrderPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        email: string;
        passwordHash: string;
        name: string;
        role: $Enums.UserRole;
        status: $Enums.UserStatus;
        active: boolean;
        lastLoginAt: Date | null;
        approvedById: string | null;
        approvedAt: Date | null;
        rejectedAt: Date | null;
        rejectionReason: string | null;
        preferences: runtime.JsonValue | null;
        phoneNumber: string | null;
        assignmentWhatsappOptIn: boolean;
        metadata: runtime.JsonValue | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["user"]>;
    composites: {};
};
export type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$UserPayload, S>;
export type UserCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: UserCountAggregateInputType | true;
};
export interface UserDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['User'];
        meta: {
            name: 'User';
        };
    };
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: Prisma.SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: Prisma.SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     *
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     *
     */
    findMany<T extends UserFindManyArgs>(args?: Prisma.SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     *
     */
    create<T extends UserCreateArgs>(args: Prisma.SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends UserCreateManyArgs>(args?: Prisma.SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     *
     */
    delete<T extends UserDeleteArgs>(args: Prisma.SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends UserUpdateArgs>(args: Prisma.SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: Prisma.SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends UserUpdateManyArgs>(args: Prisma.SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: Prisma.SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(args?: Prisma.Subset<T, UserCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], UserCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Prisma.Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>;
    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends UserGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: UserGroupByArgs['orderBy'];
    } : {
        orderBy?: UserGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the User model
     */
    readonly fields: UserFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for User.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__UserClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    approvedBy<T extends Prisma.User$approvedByArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$approvedByArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    reportedWorkOrders<T extends Prisma.User$reportedWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$reportedWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    assignedWorkOrders<T extends Prisma.User$assignedWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$assignedWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    repairActions<T extends Prisma.User$repairActionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$repairActionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RepairActionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    documents<T extends Prisma.User$documentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    approvals<T extends Prisma.User$approvalsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$approvalsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    chatConversations<T extends Prisma.User$chatConversationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$chatConversationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatConversationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    aiFeedback<T extends Prisma.User$aiFeedbackArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$aiFeedbackArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ChatMessageFeedbackPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    areaLeaderWorkOrders<T extends Prisma.User$areaLeaderWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$areaLeaderWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    maintenanceSupervisorWorkOrders<T extends Prisma.User$maintenanceSupervisorWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$maintenanceSupervisorWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    performerWorkOrders<T extends Prisma.User$performerWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$performerWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    machineReceiverWorkOrders<T extends Prisma.User$machineReceiverWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$machineReceiverWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    responsibleEngineerWorkOrders<T extends Prisma.User$responsibleEngineerWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$responsibleEngineerWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    maintenanceEngineerWorkOrders<T extends Prisma.User$maintenanceEngineerWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$maintenanceEngineerWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    maintenanceManagerWorkOrders<T extends Prisma.User$maintenanceManagerWorkOrdersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.User$maintenanceManagerWorkOrdersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$WorkOrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the User model
 */
export interface UserFieldRefs {
    readonly id: Prisma.FieldRef<"User", 'String'>;
    readonly email: Prisma.FieldRef<"User", 'String'>;
    readonly passwordHash: Prisma.FieldRef<"User", 'String'>;
    readonly name: Prisma.FieldRef<"User", 'String'>;
    readonly role: Prisma.FieldRef<"User", 'UserRole'>;
    readonly status: Prisma.FieldRef<"User", 'UserStatus'>;
    readonly active: Prisma.FieldRef<"User", 'Boolean'>;
    readonly lastLoginAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly approvedById: Prisma.FieldRef<"User", 'String'>;
    readonly approvedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly rejectedAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly rejectionReason: Prisma.FieldRef<"User", 'String'>;
    readonly preferences: Prisma.FieldRef<"User", 'Json'>;
    readonly phoneNumber: Prisma.FieldRef<"User", 'String'>;
    readonly assignmentWhatsappOptIn: Prisma.FieldRef<"User", 'Boolean'>;
    readonly metadata: Prisma.FieldRef<"User", 'Json'>;
    readonly createdAt: Prisma.FieldRef<"User", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"User", 'DateTime'>;
}
/**
 * User findUnique
 */
export type UserFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findUniqueOrThrow
 */
export type UserFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User findFirst
 */
export type UserFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findFirstOrThrow
 */
export type UserFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which User to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Users.
     */
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User findMany
 */
export type UserFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter, which Users to fetch.
     */
    where?: Prisma.UserWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Users to fetch.
     */
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Users.
     */
    cursor?: Prisma.UserWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Users from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Users.
     */
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User create
 */
export type UserCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to create a User.
     */
    data: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
};
/**
 * User createMany
 */
export type UserCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * User createManyAndReturn
 */
export type UserCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to create many Users.
     */
    data: Prisma.UserCreateManyInput | Prisma.UserCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * User update
 */
export type UserUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The data needed to update a User.
     */
    data: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
    /**
     * Choose, which User to update.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User updateMany
 */
export type UserUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
};
/**
 * User updateManyAndReturn
 */
export type UserUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * The data used to update Users.
     */
    data: Prisma.XOR<Prisma.UserUpdateManyMutationInput, Prisma.UserUncheckedUpdateManyInput>;
    /**
     * Filter which Users to update
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * User upsert
 */
export type UserUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: Prisma.UserWhereUniqueInput;
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: Prisma.XOR<Prisma.UserCreateInput, Prisma.UserUncheckedCreateInput>;
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.UserUpdateInput, Prisma.UserUncheckedUpdateInput>;
};
/**
 * User delete
 */
export type UserDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    /**
     * Filter which User to delete.
     */
    where: Prisma.UserWhereUniqueInput;
};
/**
 * User deleteMany
 */
export type UserDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: Prisma.UserWhereInput;
    /**
     * Limit how many Users to delete.
     */
    limit?: number;
};
/**
 * User.approvedBy
 */
export type User$approvedByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
/**
 * User.reportedWorkOrders
 */
export type User$reportedWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.assignedWorkOrders
 */
export type User$assignedWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.repairActions
 */
export type User$repairActionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RepairAction
     */
    select?: Prisma.RepairActionSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the RepairAction
     */
    omit?: Prisma.RepairActionOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RepairActionInclude<ExtArgs> | null;
    where?: Prisma.RepairActionWhereInput;
    orderBy?: Prisma.RepairActionOrderByWithRelationInput | Prisma.RepairActionOrderByWithRelationInput[];
    cursor?: Prisma.RepairActionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RepairActionScalarFieldEnum | Prisma.RepairActionScalarFieldEnum[];
};
/**
 * User.documents
 */
export type User$documentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: Prisma.DocumentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Document
     */
    omit?: Prisma.DocumentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.DocumentInclude<ExtArgs> | null;
    where?: Prisma.DocumentWhereInput;
    orderBy?: Prisma.DocumentOrderByWithRelationInput | Prisma.DocumentOrderByWithRelationInput[];
    cursor?: Prisma.DocumentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DocumentScalarFieldEnum | Prisma.DocumentScalarFieldEnum[];
};
/**
 * User.approvals
 */
export type User$approvalsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
/**
 * User.chatConversations
 */
export type User$chatConversationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatConversation
     */
    select?: Prisma.ChatConversationSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatConversation
     */
    omit?: Prisma.ChatConversationOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChatConversationInclude<ExtArgs> | null;
    where?: Prisma.ChatConversationWhereInput;
    orderBy?: Prisma.ChatConversationOrderByWithRelationInput | Prisma.ChatConversationOrderByWithRelationInput[];
    cursor?: Prisma.ChatConversationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatConversationScalarFieldEnum | Prisma.ChatConversationScalarFieldEnum[];
};
/**
 * User.aiFeedback
 */
export type User$aiFeedbackArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ChatMessageFeedback
     */
    select?: Prisma.ChatMessageFeedbackSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ChatMessageFeedback
     */
    omit?: Prisma.ChatMessageFeedbackOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ChatMessageFeedbackInclude<ExtArgs> | null;
    where?: Prisma.ChatMessageFeedbackWhereInput;
    orderBy?: Prisma.ChatMessageFeedbackOrderByWithRelationInput | Prisma.ChatMessageFeedbackOrderByWithRelationInput[];
    cursor?: Prisma.ChatMessageFeedbackWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ChatMessageFeedbackScalarFieldEnum | Prisma.ChatMessageFeedbackScalarFieldEnum[];
};
/**
 * User.areaLeaderWorkOrders
 */
export type User$areaLeaderWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.maintenanceSupervisorWorkOrders
 */
export type User$maintenanceSupervisorWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.performerWorkOrders
 */
export type User$performerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.machineReceiverWorkOrders
 */
export type User$machineReceiverWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.responsibleEngineerWorkOrders
 */
export type User$responsibleEngineerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.maintenanceEngineerWorkOrders
 */
export type User$maintenanceEngineerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User.maintenanceManagerWorkOrders
 */
export type User$maintenanceManagerWorkOrdersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkOrder
     */
    select?: Prisma.WorkOrderSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the WorkOrder
     */
    omit?: Prisma.WorkOrderOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.WorkOrderInclude<ExtArgs> | null;
    where?: Prisma.WorkOrderWhereInput;
    orderBy?: Prisma.WorkOrderOrderByWithRelationInput | Prisma.WorkOrderOrderByWithRelationInput[];
    cursor?: Prisma.WorkOrderWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.WorkOrderScalarFieldEnum | Prisma.WorkOrderScalarFieldEnum[];
};
/**
 * User without action
 */
export type UserDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: Prisma.UserSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the User
     */
    omit?: Prisma.UserOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.UserInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=User.d.ts.map