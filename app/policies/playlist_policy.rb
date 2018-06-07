class PlaylistPolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope.where(user: user)
    end
  end

  def index?
    !user.nil?
  end

  def show?
    !user.nil?
  end

  def create?
    !user.nil?
  end

  def new?
    create?
  end

  def edit?
    update?
  end

  def update?
    record.user == user
  end

  def destroy?
    record.user == user
  end
end
