drop policy "Enable insert for users based on user_id" on "public"."storyAccomplishments";

create policy "Enable delete for users based on user_id"
on "public"."progress"
as permissive
for delete
to public
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for authenticated users only"
on "public"."storyAccomplishments"
as permissive
for insert
to authenticated
with check (true);



