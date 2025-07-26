import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import type { UserProfile } from "@/types/api";

// Query keys for consistent cache management
export const queryKeys = {
  userProfile: (userId: string) => ["userProfile", userId],
  posts: () => ["posts"],
  externalData: () => ["externalData"],
};

// User profile queries
export function useUserProfile() {
  const { user } = useAuth();

  return useQuery({
    queryKey: queryKeys.userProfile(user?.id || ""),
    queryFn: () => api.getUserProfile(user!.id),
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (updates: Partial<UserProfile>) =>
      api.updateUserProfile(user!.id, updates),
    onSuccess: data => {
      // Update the cache with the new data
      queryClient.setQueryData(queryKeys.userProfile(user!.id), data);
      // Or invalidate to refetch
      // queryClient.invalidateQueries({ queryKey: queryKeys.userProfile(user!.id) })
    },
  });
}

// Posts queries
export function usePosts() {
  return useQuery({
    queryKey: queryKeys.posts(),
    queryFn: api.getPosts,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.createPost,
    onSuccess: () => {
      // Invalidate and refetch posts
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: api.deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.posts() });
    },
  });
}

// External data query
export function useExternalData() {
  return useQuery({
    queryKey: queryKeys.externalData(),
    queryFn: api.getExternalData,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
