<script setup lang="ts">
import { useStorage } from '../../hooks';
import { Profile, deleteProfile } from '../../profiles';
import { RouteName } from '../../router';

interface Props {
    allProfiles: Profile[];
    meta: {
        title: {
          value: string;
        };
    };
}
const props = defineProps<Props>();

const storage = useStorage();

const onDeleteProfileClick = (profile: Profile) => {
    deleteProfile(profile.uuid, storage);
};
</script>

<template>
    <v-toolbar density="comfortable" color="black" class="toolbar">
      <h1 class="text-h6">{{  props.meta.title.value }}</h1>
      <v-spacer></v-spacer>
        <v-chip
          v-for="profile in props.allProfiles" :key="profile.uuid"
          :data-testid="`profile-chip-${profile.uuid}`"
          variant="elevated" color="gray" class="profile-chip">
            <v-btn
                color="white"
                :to="{ name: RouteName.PROFILE, params: { profileUuid: profile.uuid }}">
                Profile: {{  profile.name }}
            </v-btn>
            <v-btn
                color="blue"
                :to="{ name: RouteName.PROFILE_EDITOR__EXISTING, params: { profileUuid: profile.uuid }}">
                Edit
            </v-btn>
            <v-btn
                color="red"
                @click="onDeleteProfileClick(profile)">
                Delete
            </v-btn>
        </v-chip>
        <v-chip>
            <v-btn
                color="green"
                :to="{ name: RouteName.PROFILE_EDITOR__NEW }">
                New Profile
            </v-btn>
        </v-chip>
    </v-toolbar>
</template>

<style>
.profile-chip {
  color: white;
  text-decoration: none;
}
</style>
