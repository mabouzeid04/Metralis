import type * as runtime from "@prisma/client/runtime/library";
import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type EnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type JsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type EnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type JsonNullableWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type JsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>, Required<JsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>;
export type JsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type JsonWithAggregatesFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>, Required<JsonWithAggregatesFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>;
export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedJsonFilter<$PrismaModel>;
    _max?: Prisma.NestedJsonFilter<$PrismaModel>;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type EnumAssetStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | Prisma.EnumAssetStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetStatusNullableFilter<$PrismaModel> | $Enums.AssetStatus | null;
};
export type EnumAssetCriticalityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCriticality | Prisma.EnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetCriticalityNullableFilter<$PrismaModel> | $Enums.AssetCriticality | null;
};
export type EnumAssetStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | Prisma.EnumAssetStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetStatusNullableFilter<$PrismaModel>;
};
export type EnumAssetCriticalityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCriticality | Prisma.EnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetCriticalityNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetCriticality | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetCriticalityNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetCriticalityNullableFilter<$PrismaModel>;
};
export type EnumMachineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineStatus | Prisma.EnumMachineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineStatusFilter<$PrismaModel> | $Enums.MachineStatus;
};
export type EnumMachineCriticalityFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineCriticality | Prisma.EnumMachineCriticalityFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineCriticalityFilter<$PrismaModel> | $Enums.MachineCriticality;
};
export type EnumMachineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineStatus | Prisma.EnumMachineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineStatusWithAggregatesFilter<$PrismaModel> | $Enums.MachineStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMachineStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMachineStatusFilter<$PrismaModel>;
};
export type EnumMachineCriticalityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineCriticality | Prisma.EnumMachineCriticalityFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineCriticalityWithAggregatesFilter<$PrismaModel> | $Enums.MachineCriticality;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMachineCriticalityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMachineCriticalityFilter<$PrismaModel>;
};
export type EnumWorkOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | Prisma.EnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderStatusFilter<$PrismaModel> | $Enums.WorkOrderStatus;
};
export type EnumWorkOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderType | Prisma.EnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderTypeFilter<$PrismaModel> | $Enums.WorkOrderType;
};
export type EnumWorkOrderPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderPriority | Prisma.EnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderPriorityFilter<$PrismaModel> | $Enums.WorkOrderPriority;
};
export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type EnumWorkOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | Prisma.EnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkOrderStatusFilter<$PrismaModel>;
};
export type EnumWorkOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderType | Prisma.EnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkOrderTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkOrderTypeFilter<$PrismaModel>;
};
export type EnumWorkOrderPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderPriority | Prisma.EnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderPriorityWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkOrderPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkOrderPriorityFilter<$PrismaModel>;
};
export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type EnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | Prisma.EnumDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType;
};
export type EnumDocumentIngestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentIngestionStatus | Prisma.EnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentIngestionStatusFilter<$PrismaModel> | $Enums.DocumentIngestionStatus;
};
export type EnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | Prisma.EnumDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDocumentTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDocumentTypeFilter<$PrismaModel>;
};
export type EnumDocumentIngestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentIngestionStatus | Prisma.EnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentIngestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentIngestionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDocumentIngestionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDocumentIngestionStatusFilter<$PrismaModel>;
};
export type EnumChatMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | Prisma.EnumChatMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumChatMessageRoleFilter<$PrismaModel> | $Enums.ChatMessageRole;
};
export type EnumChatMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | Prisma.EnumChatMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumChatMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatMessageRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumChatMessageRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumChatMessageRoleFilter<$PrismaModel>;
};
export type EnumAiFeedbackValueFilter<$PrismaModel = never> = {
    equals?: $Enums.AiFeedbackValue | Prisma.EnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    in?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAiFeedbackValueFilter<$PrismaModel> | $Enums.AiFeedbackValue;
};
export type EnumAiFeedbackValueWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiFeedbackValue | Prisma.EnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    in?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAiFeedbackValueWithAggregatesFilter<$PrismaModel> | $Enums.AiFeedbackValue;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAiFeedbackValueFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAiFeedbackValueFilter<$PrismaModel>;
};
export type EnumInsightCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightCategory | Prisma.EnumInsightCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightCategoryFilter<$PrismaModel> | $Enums.InsightCategory;
};
export type EnumInsightPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightPriority | Prisma.EnumInsightPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightPriorityFilter<$PrismaModel> | $Enums.InsightPriority;
};
export type EnumInsightStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightStatus | Prisma.EnumInsightStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightStatusFilter<$PrismaModel> | $Enums.InsightStatus;
};
export type EnumInsightCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightCategory | Prisma.EnumInsightCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightCategoryWithAggregatesFilter<$PrismaModel> | $Enums.InsightCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInsightCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInsightCategoryFilter<$PrismaModel>;
};
export type EnumInsightPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightPriority | Prisma.EnumInsightPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightPriorityWithAggregatesFilter<$PrismaModel> | $Enums.InsightPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInsightPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInsightPriorityFilter<$PrismaModel>;
};
export type EnumInsightStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightStatus | Prisma.EnumInsightStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightStatusWithAggregatesFilter<$PrismaModel> | $Enums.InsightStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInsightStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInsightStatusFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type NestedEnumUserStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusFilter<$PrismaModel> | $Enums.UserStatus;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type NestedEnumUserStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserStatus | Prisma.EnumUserStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserStatus[] | Prisma.ListEnumUserStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserStatusWithAggregatesFilter<$PrismaModel> | $Enums.UserStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserStatusFilter<$PrismaModel>;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedJsonNullableFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonNullableFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedJsonFilter<$PrismaModel = never> = Prisma.PatchUndefined<Prisma.Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>, Required<NestedJsonFilterBase<$PrismaModel>>> | Prisma.OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>;
export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
    path?: string[];
    mode?: Prisma.QueryMode | Prisma.EnumQueryModeFieldRefInput<$PrismaModel>;
    string_contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_starts_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    string_ends_with?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    array_starts_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_ends_with?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    array_contains?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | null;
    lt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    lte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gt?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    gte?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel>;
    not?: runtime.InputJsonValue | Prisma.JsonFieldRefInput<$PrismaModel> | Prisma.JsonNullValueFilter;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumAssetStatusNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | Prisma.EnumAssetStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetStatusNullableFilter<$PrismaModel> | $Enums.AssetStatus | null;
};
export type NestedEnumAssetCriticalityNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCriticality | Prisma.EnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetCriticalityNullableFilter<$PrismaModel> | $Enums.AssetCriticality | null;
};
export type NestedEnumAssetStatusNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetStatus | Prisma.EnumAssetStatusFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetStatus[] | Prisma.ListEnumAssetStatusFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetStatusNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetStatus | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetStatusNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetStatusNullableFilter<$PrismaModel>;
};
export type NestedEnumAssetCriticalityNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AssetCriticality | Prisma.EnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    in?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.AssetCriticality[] | Prisma.ListEnumAssetCriticalityFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumAssetCriticalityNullableWithAggregatesFilter<$PrismaModel> | $Enums.AssetCriticality | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAssetCriticalityNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAssetCriticalityNullableFilter<$PrismaModel>;
};
export type NestedEnumMachineStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineStatus | Prisma.EnumMachineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineStatusFilter<$PrismaModel> | $Enums.MachineStatus;
};
export type NestedEnumMachineCriticalityFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineCriticality | Prisma.EnumMachineCriticalityFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineCriticalityFilter<$PrismaModel> | $Enums.MachineCriticality;
};
export type NestedEnumMachineStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineStatus | Prisma.EnumMachineStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineStatus[] | Prisma.ListEnumMachineStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineStatusWithAggregatesFilter<$PrismaModel> | $Enums.MachineStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMachineStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMachineStatusFilter<$PrismaModel>;
};
export type NestedEnumMachineCriticalityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MachineCriticality | Prisma.EnumMachineCriticalityFieldRefInput<$PrismaModel>;
    in?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MachineCriticality[] | Prisma.ListEnumMachineCriticalityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMachineCriticalityWithAggregatesFilter<$PrismaModel> | $Enums.MachineCriticality;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMachineCriticalityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMachineCriticalityFilter<$PrismaModel>;
};
export type NestedEnumWorkOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | Prisma.EnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderStatusFilter<$PrismaModel> | $Enums.WorkOrderStatus;
};
export type NestedEnumWorkOrderTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderType | Prisma.EnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderTypeFilter<$PrismaModel> | $Enums.WorkOrderType;
};
export type NestedEnumWorkOrderPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderPriority | Prisma.EnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderPriorityFilter<$PrismaModel> | $Enums.WorkOrderPriority;
};
export type NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderStatus | Prisma.EnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderStatus[] | Prisma.ListEnumWorkOrderStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkOrderStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkOrderStatusFilter<$PrismaModel>;
};
export type NestedEnumWorkOrderTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderType | Prisma.EnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderType[] | Prisma.ListEnumWorkOrderTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderTypeWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkOrderTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkOrderTypeFilter<$PrismaModel>;
};
export type NestedEnumWorkOrderPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkOrderPriority | Prisma.EnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.WorkOrderPriority[] | Prisma.ListEnumWorkOrderPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumWorkOrderPriorityWithAggregatesFilter<$PrismaModel> | $Enums.WorkOrderPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumWorkOrderPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumWorkOrderPriorityFilter<$PrismaModel>;
};
export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedIntNullableFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
};
export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel> | null;
    in?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    notIn?: runtime.Decimal[] | runtime.DecimalJsLike[] | number[] | string[] | Prisma.ListDecimalFieldRefInput<$PrismaModel> | null;
    lt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    lte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gt?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    gte?: runtime.Decimal | runtime.DecimalJsLike | number | string | Prisma.DecimalFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | runtime.Decimal | runtime.DecimalJsLike | number | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDecimalNullableFilter<$PrismaModel>;
};
export type NestedEnumDocumentTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | Prisma.EnumDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentTypeFilter<$PrismaModel> | $Enums.DocumentType;
};
export type NestedEnumDocumentIngestionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentIngestionStatus | Prisma.EnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentIngestionStatusFilter<$PrismaModel> | $Enums.DocumentIngestionStatus;
};
export type NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentType | Prisma.EnumDocumentTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentType[] | Prisma.ListEnumDocumentTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentTypeWithAggregatesFilter<$PrismaModel> | $Enums.DocumentType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDocumentTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDocumentTypeFilter<$PrismaModel>;
};
export type NestedEnumDocumentIngestionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.DocumentIngestionStatus | Prisma.EnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.DocumentIngestionStatus[] | Prisma.ListEnumDocumentIngestionStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumDocumentIngestionStatusWithAggregatesFilter<$PrismaModel> | $Enums.DocumentIngestionStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumDocumentIngestionStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumDocumentIngestionStatusFilter<$PrismaModel>;
};
export type NestedEnumChatMessageRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | Prisma.EnumChatMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumChatMessageRoleFilter<$PrismaModel> | $Enums.ChatMessageRole;
};
export type NestedEnumChatMessageRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ChatMessageRole | Prisma.EnumChatMessageRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.ChatMessageRole[] | Prisma.ListEnumChatMessageRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumChatMessageRoleWithAggregatesFilter<$PrismaModel> | $Enums.ChatMessageRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumChatMessageRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumChatMessageRoleFilter<$PrismaModel>;
};
export type NestedEnumAiFeedbackValueFilter<$PrismaModel = never> = {
    equals?: $Enums.AiFeedbackValue | Prisma.EnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    in?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAiFeedbackValueFilter<$PrismaModel> | $Enums.AiFeedbackValue;
};
export type NestedEnumAiFeedbackValueWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiFeedbackValue | Prisma.EnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    in?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    notIn?: $Enums.AiFeedbackValue[] | Prisma.ListEnumAiFeedbackValueFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumAiFeedbackValueWithAggregatesFilter<$PrismaModel> | $Enums.AiFeedbackValue;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumAiFeedbackValueFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumAiFeedbackValueFilter<$PrismaModel>;
};
export type NestedEnumInsightCategoryFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightCategory | Prisma.EnumInsightCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightCategoryFilter<$PrismaModel> | $Enums.InsightCategory;
};
export type NestedEnumInsightPriorityFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightPriority | Prisma.EnumInsightPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightPriorityFilter<$PrismaModel> | $Enums.InsightPriority;
};
export type NestedEnumInsightStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightStatus | Prisma.EnumInsightStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightStatusFilter<$PrismaModel> | $Enums.InsightStatus;
};
export type NestedEnumInsightCategoryWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightCategory | Prisma.EnumInsightCategoryFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightCategory[] | Prisma.ListEnumInsightCategoryFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightCategoryWithAggregatesFilter<$PrismaModel> | $Enums.InsightCategory;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInsightCategoryFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInsightCategoryFilter<$PrismaModel>;
};
export type NestedEnumInsightPriorityWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightPriority | Prisma.EnumInsightPriorityFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightPriority[] | Prisma.ListEnumInsightPriorityFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightPriorityWithAggregatesFilter<$PrismaModel> | $Enums.InsightPriority;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInsightPriorityFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInsightPriorityFilter<$PrismaModel>;
};
export type NestedEnumInsightStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.InsightStatus | Prisma.EnumInsightStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.InsightStatus[] | Prisma.ListEnumInsightStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumInsightStatusWithAggregatesFilter<$PrismaModel> | $Enums.InsightStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumInsightStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumInsightStatusFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map