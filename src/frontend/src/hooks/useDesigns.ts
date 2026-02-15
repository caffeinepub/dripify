import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Design, GarmentType, TextLayer } from '../backend';

export function useListMyDesigns() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Design[]>({
    queryKey: ['myDesigns'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listMyDesigns();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useGetDesign(id: string | null) {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<Design | null>({
    queryKey: ['design', id],
    queryFn: async () => {
      if (!actor || !id) return null;
      return actor.getDesign(id);
    },
    enabled: !!actor && !actorFetching && !!id,
  });
}

export function useSaveDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      garmentType,
      textLayers,
    }: {
      id: string;
      name: string;
      garmentType: GarmentType;
      textLayers: TextLayer[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveDesign(id, name, garmentType, textLayers);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDesigns'] });
    },
  });
}

export function useRenameDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, newName }: { id: string; newName: string }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.renameDesign(id, newName);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDesigns'] });
    },
  });
}

export function useDeleteDesign() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      if (!actor) throw new Error('Actor not available');
      await actor.deleteDesign(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myDesigns'] });
    },
  });
}
